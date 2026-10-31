import { useAppDispatch } from "@/hooks";
import { useNow } from "@/hooks/useNow";
import { useClassroomsByIdsQuery } from "@/queries/classrooms";
import {
  useLeaveRequestMutation,
  useMyLeaveRequestsQuery,
} from "@/queries/leaveRequests";
import { setErrorSnackbar, setSuccessSnackbar } from "@/reducers/snackbar";
import { LeaveRequestResult } from "@/types/leaveRequest";
import { User } from "@/types/user";
import {
  LEAVE_CUTOFF_MESSAGE,
  getNextClassStart,
  isLeaveWindowOpen,
} from "@/utils/datetime";
import { Close, EventOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const MAX_REASON_LENGTH = 500;

type FormValues = { classroomIds: string[]; reason: string };

/**
 * Request leave for one student from the next session of one or more classes.
 * With a single classroom it shows a summary of that session; with several it
 * shows a checklist so a parent can excuse a child from all classes at once.
 */
export const RequestLeaveModal = ({
  open,
  onClose,
  student,
  classroomIds,
}: {
  open: boolean;
  onClose: () => void;
  student: User;
  classroomIds: string[];
}) => {
  const dispatch = useAppDispatch();
  const now = useNow();
  const classroomQueries = useClassroomsByIdsQuery(open ? classroomIds : []);
  const { data: myLeaveRequests } = useMyLeaveRequestsQuery();
  const isSingleClass = classroomIds.length === 1;

  const classOptions = classroomQueries.map(({ data }, index) => {
    const classroomId = classroomIds[index];
    const nextStart = getNextClassStart(data, now);
    const alreadyRequested = !!myLeaveRequests?.some(
      (leaveRequest) =>
        `${leaveRequest.studentId}` === `${student._id}` &&
        leaveRequest.classroomId === classroomId &&
        leaveRequest.date === nextStart?.format("YYYY-MM-DD"),
    );
    const disabledReason = !data
      ? "Loading..."
      : !nextStart
        ? "No upcoming class scheduled"
        : alreadyRequested
          ? "Already excused"
          : !isLeaveWindowOpen(nextStart, now)
            ? LEAVE_CUTOFF_MESSAGE
            : "";

    return {
      classroomId,
      classroom: data,
      nextStart,
      alreadyRequested,
      disabledReason,
    };
  });

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<FormValues>({
      defaultValues: { classroomIds: [], reason: "" },
    });
  const selectedIds = watch("classroomIds");

  // With a single class there is nothing to pick, so select it when allowed
  const singleClassId = isSingleClass ? classroomIds[0] : undefined;
  const singleClassSelectable =
    !!singleClassId && !classOptions[0]?.disabledReason;
  useEffect(() => {
    if (singleClassId)
      setValue("classroomIds", singleClassSelectable ? [singleClassId] : []);
  }, [singleClassId, singleClassSelectable, open, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const requestLeave = useLeaveRequestMutation({
    onSuccess: (response) => {
      const { created, skipped }: LeaveRequestResult = response.data.data;
      const firstName = student.name?.split(" ")[0] ?? "The student";
      dispatch(
        setSuccessSnackbar({
          title: "Leave requested",
          content: (
            <>
              {created.map((leaveRequest) => (
                <div key={leaveRequest._id}>
                  {firstName} will be marked excused for{" "}
                  {leaveRequest.classroomName} on{" "}
                  {leaveRequest.date.split("-").slice(1).join("/")}.
                </div>
              ))}
              {skipped.map((skip) => (
                <div key={skip.classroomId}>
                  Not requested for{" "}
                  {classOptions.find(
                    (option) => option.classroomId === skip.classroomId,
                  )?.classroom?.name ?? "a class"}
                  : {skip.reason}
                </div>
              ))}
            </>
          ),
        }),
      );
      handleClose();
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

  const onSubmit = (data: FormValues) => {
    requestLeave.mutate({
      data: {
        studentId: `${student._id}`,
        classroomIds: data.classroomIds,
        reason: data.reason.trim(),
      },
    });
  };

  const formatSession = (option: (typeof classOptions)[number]) =>
    option.nextStart
      ? `${option.nextStart.format("ddd, MMM D")} · ${option.classroom?.start.label} EST`
      : "Not Scheduled";

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Request Leave</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography color="text.secondary">
            <strong>{student.name}</strong> will be marked excused for the next
            session. Leave can be requested until an hour before the class
            starts.
          </Typography>

          {isSingleClass ? (
            <Paper
              elevation={0}
              sx={(theme) => ({
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                border: `1px solid ${theme.palette.grey[300]}`,
              })}
            >
              <EventOutlined color="primary" />
              <Box>
                <Typography>{classOptions[0]?.classroom?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {classOptions[0] && formatSession(classOptions[0])}
                </Typography>
                {classOptions[0]?.disabledReason && (
                  <Typography variant="caption" color="error">
                    {classOptions[0].disabledReason}
                  </Typography>
                )}
              </Box>
            </Paper>
          ) : (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Classes
              </Typography>
              {classOptions.map((option) => (
                <Box key={option.classroomId} sx={{ mb: 1 }}>
                  <FormControlLabel
                    disabled={!!option.disabledReason}
                    control={
                      <Checkbox
                        checked={
                          option.alreadyRequested ||
                          selectedIds.includes(option.classroomId)
                        }
                        onChange={(_, checked) =>
                          setValue(
                            "classroomIds",
                            checked
                              ? [...selectedIds, option.classroomId]
                              : selectedIds.filter(
                                  (id) => id !== option.classroomId,
                                ),
                          )
                        }
                      />
                    }
                    label={
                      <Box>
                        <Typography>
                          {option.classroom?.name ?? "Loading..."}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatSession(option)}
                        </Typography>
                        {option.disabledReason && (
                          <Typography variant="caption">
                            {option.disabledReason}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </Box>
              ))}
            </Box>
          )}

          <Controller
            name="reason"
            control={control}
            rules={{
              validate: (value) =>
                value.trim().length > 0 || "Please share a reason",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                multiline
                minRows={3}
                label="Reason"
                slotProps={{ htmlInput: { maxLength: MAX_REASON_LENGTH } }}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ??
                  `${field.value.length}/${MAX_REASON_LENGTH}`
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            loading={requestLeave.isPending}
            disabled={requestLeave.isPending || selectedIds.length === 0}
            variant="contained"
            type="submit"
          >
            Submit Request
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
