import { MultiDatePicker } from "@/components/DatePicker";
import { Loading } from "@/components/Loading";
import { useAppSelector } from "@/hooks";
import { useOneClassroomQuery } from "@/queries/classrooms";
import { useTeacherByClassIdQuery } from "@/queries/teachers";
import { Classroom } from "@/types/classroom";
import { User } from "@/types/user";
import { getNextSession } from "@/utils/datetime";
import {
  InfoOutline,
  InsertDriveFileOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { ClockIcon } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";

const hasAccessToClass = (user: User, classroomId: string | undefined) => {
  if (!user || !classroomId) return false;
  const userClassrooms = user.classrooms?.map((classroom) => classroom.value);
  return userClassrooms?.includes(classroomId) || false;
};

const ClassScheduleContainer = ({ classroom }: { classroom?: Classroom }) => {
  const schedule = classroom?.schedule.map((schedule) => dayjs(schedule));
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        padding: 3,
        border: `1px solid ${theme.palette.grey[300]}`,
        my: 4,
      })}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ClockIcon sx={{ width: "32px", height: "32px" }} />
            <Box>
              <Typography>Class not in session right now</Typography>
              <Typography>
                Next Class:{" "}
                {getNextSession(schedule)?.format("MM/DD/YYYY") ??
                  "Not Scheduled"}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <InfoOutline />
          <Typography>
            Meeting link will be available when the session starts
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const ClassResourcesContainer = () => {
  return (
    <Paper sx={{ padding: 4, my: 3, minHeight: "300px" }}>
      <Typography variant="h5">Class Resources</Typography>
      <Typography color="text.secondary">
        Materials and Resources for this class
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          my: 2,
        }}
      >
        <InsertDriveFileOutlined
          color="disabled"
          sx={{ width: "40px", height: "40px" }}
        />
        <Typography color="textSecondary">No Resources yet...</Typography>
      </Box>
    </Paper>
  );
};

const ClassAnnouncementsContainer = () => {
  return (
    <Paper sx={{ padding: 4, my: 3, minHeight: "300px" }}>
      <Typography variant="h5">Annoucements</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          my: 2,
        }}
      >
        <InsertDriveFileOutlined
          color="disabled"
          sx={{ width: "40px", height: "40px" }}
        />
        <Typography color="textSecondary">No Annoucements...</Typography>
      </Box>
    </Paper>
  );
};

export const PageClass = () => {
  const { id } = useParams();
  const { currentUser } = useAppSelector((state) => state.user);
  const { isLoading, isRefetching, data } = useOneClassroomQuery(id);
  const {
    isLoading: isLoadingTeacher,
    isRefetching: isRefetchingTeacher,
    data: teacher,
  } = useTeacherByClassIdQuery(id);
  const navigate = useNavigate();

  /**
   * If user does not have access to this classroom, navigate them back to the dashboard
   */
  if (!hasAccessToClass(currentUser, id)) navigate("/protected/dashboard");

  if (isLoading || isRefetching) return <Loading />;

  return (
    <>
      <Paper sx={{ padding: 4 }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="h2"
              color="primary"
              textTransform={"uppercase"}
            >
              {data?.name}
            </Typography>
            <Typography>{data?.description}</Typography>
            <Paper
              elevation={0}
              sx={(theme) => ({
                padding: 3,
                border: `1px solid ${theme.palette.grey[300]}`,
                my: 4,
              })}
            >
              {isLoadingTeacher || isRefetchingTeacher ? (
                <Loading height="100%" />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box>
                    <SchoolOutlined sx={{ width: "32px", height: "32px" }} />
                  </Box>
                  <Box>
                    <Typography>{teacher?.name}</Typography>
                    <Typography>{teacher?.email}</Typography>
                  </Box>
                </Box>
              )}
            </Paper>
            <ClassScheduleContainer classroom={data} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <MultiDatePicker
              values={data?.schedule?.map((schedule) => dayjs(schedule))}
              setValues={() => {}}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid rowSpacing={1} height={"fit-content"} columnSpacing={1} container>
        <Grid size={{ xs: 12, md: 8 }}>
          <ClassResourcesContainer />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ClassAnnouncementsContainer />
        </Grid>
      </Grid>
    </>
  );
};
