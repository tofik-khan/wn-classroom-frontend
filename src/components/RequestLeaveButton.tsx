import { useAppDispatch } from "@/hooks";
import { useNow } from "@/hooks/useNow";
import { RequestLeaveModal } from "@/pages/protected/modals/RequestLeaveModal";
import {
  useCancelLeaveRequestMutation,
  useMyLeaveRequestsQuery,
} from "@/queries/leaveRequests";
import { setErrorSnackbar, setSuccessSnackbar } from "@/reducers/snackbar";
import { Classroom } from "@/types/classroom";
import { User } from "@/types/user";
import {
  LEAVE_CUTOFF_MESSAGE,
  getNextClassStart,
  isLeaveWindowOpen,
} from "@/utils/datetime";
import { CheckCircleOutline, EventBusy } from "@mui/icons-material";
import { Box, Button, Chip, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

/**
 * Disabled buttons don't fire pointer events, so the tooltip wraps a span.
 * `enterTouchDelay={0}` makes the message show on tap for mobile users.
 */
const DisabledTooltip = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement;
}) => (
  <Tooltip title={title} enterTouchDelay={0} arrow>
    <span>{children}</span>
  </Tooltip>
);

const StudentLeaveRow = ({
  classroom,
  student,
  showName,
}: {
  classroom: Classroom;
  student: User;
  showName: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const now = useNow();
  const dispatch = useAppDispatch();
  const { data: myLeaveRequests } = useMyLeaveRequestsQuery();

  const nextStart = getNextClassStart(classroom, now);
  const firstName = student.name?.split(" ")[0] ?? "";
  const leaveRequest = myLeaveRequests?.find(
    (request) =>
      `${request.studentId}` === `${student._id}` &&
      request.classroomId === classroom._id &&
      request.date === nextStart?.format("YYYY-MM-DD"),
  );

  const cancelLeaveRequest = useCancelLeaveRequestMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Leave withdrawn",
          content: `${firstName} is no longer excused from the next class`,
        }),
      );
    },
    onError: (error) => {
      dispatch(
        setErrorSnackbar({
          title: "Oops! Something went wrong!",
          content: error?.response?.data?.message ?? error?.message,
        }),
      );
    },
  });

  if (leaveRequest) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Chip
          color="success"
          icon={<CheckCircleOutline />}
          label={`Excused for ${dayjs(leaveRequest.scheduledStart)
            .tz("America/New_York")
            .format("MM/DD")}${showName ? ` (${firstName})` : ""}`}
        />
        <Button
          size="small"
          disabled={cancelLeaveRequest.isPending}
          loading={cancelLeaveRequest.isPending}
          onClick={() => cancelLeaveRequest.mutate({ id: leaveRequest._id })}
        >
          Withdraw
        </Button>
      </Box>
    );
  }

  const canRequest = isLeaveWindowOpen(nextStart, now);
  const requestButton = (
    <Button
      variant="outlined"
      size="small"
      startIcon={<EventBusy />}
      disabled={!canRequest}
      onClick={() => setOpen(true)}
    >
      Request Leave{showName ? ` for ${firstName}` : ""}
    </Button>
  );

  return (
    <Box sx={{ mt: 1 }}>
      {canRequest ? (
        requestButton
      ) : (
        <DisabledTooltip
          title={
            nextStart ? LEAVE_CUTOFF_MESSAGE : "No upcoming class scheduled"
          }
        >
          {requestButton}
        </DisabledTooltip>
      )}
      <RequestLeaveModal
        open={open}
        onClose={() => setOpen(false)}
        student={student}
        classroomIds={[classroom._id!]}
      />
    </Box>
  );
};

/**
 * Request leave controls for the class page. Parents with several children
 * in the same class get one row per child.
 */
export const RequestLeaveButton = ({
  classroom,
  students,
}: {
  classroom?: Classroom;
  students: User[];
}) => {
  if (!classroom?._id || students.length === 0) return <></>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {students.map((student) => (
        <StudentLeaveRow
          key={student._id}
          classroom={classroom}
          student={student}
          showName={students.length > 1}
        />
      ))}
    </Box>
  );
};
