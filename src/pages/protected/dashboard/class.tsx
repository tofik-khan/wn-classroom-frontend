import { API_BASE } from "@/api/constants";
import { MultiDatePicker } from "@/components/DatePicker";
import { Loading } from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useOneClassroomQuery } from "@/queries/classrooms";
import { useMyStudentsQuery } from "@/queries/parents";
import { useSessionMutation, useSessionQuery } from "@/queries/session";
import { useTeacherByClassIdQuery } from "@/queries/teachers";
import { Classroom } from "@/types/classroom";
import { User } from "@/types/user";
import { getNextSession } from "@/utils/datetime";
import {
  Add,
  InfoOutline,
  InsertDriveFileOutlined,
  Person,
  SchoolOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { ClockIcon } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AnnoucementModal } from "../modals/ClassAnnouncementModal";
import { useAnnouncementQuery } from "@/queries/announcements";
import { Editor } from "@/components/wysiwyg/editor";
import { setSuccessSnackbar, setErrorSnackbar } from "@/reducers/snackbar";
import { ResourceModal } from "../modals/ClassResourceModal";

const teacherRoles = ["admin", "teacher", "substitute"];

const hasAccessToClass = (user: User, classroomId: string | undefined) => {
  const { data: myStudents } = useMyStudentsQuery();
  if (!user || !classroomId) return false;
  if (user.role === "parent") {
    const myStudentsClassrooms =
      myStudents!
        .map((student) => {
          return student!.classrooms!.map((classroom) => classroom.value);
        })
        .flat() ?? [];
    return myStudentsClassrooms?.includes(classroomId) || false;
  }
  if (user.role === "admin" || user.role === "substitute") return true;
  const userClassrooms = user.classrooms?.map((classroom) => classroom.value);
  return userClassrooms?.includes(classroomId) || false;
};

const ClassScheduleContainer = ({ classroom }: { classroom?: Classroom }) => {
  const { data: classroomSession } = useSessionQuery(classroom?._id);

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
              {!!classroomSession ? (
                <Button
                  variant="contained"
                  href={classroomSession.link}
                  target="_blank"
                >
                  Join Session
                </Button>
              ) : (
                <>
                  <Typography>Class not in session right now</Typography>
                  <Typography>
                    Next Class:{" "}
                    {getNextSession(schedule)?.format("MM/DD/YYYY") ??
                      "Not Scheduled"}
                  </Typography>
                </>
              )}
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

const ClassResourcesContainer = ({ classroom }: { classroom?: Classroom }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Paper sx={{ padding: 4, my: 3, minHeight: "300px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5">Class Resources</Typography>
          </Box>
          {teacherRoles.includes(currentUser.role) && (
            <Button variant="contained" onClick={() => setOpen(true)}>
              <Add />
            </Button>
          )}
        </Box>
        <Typography color="text.secondary">
          Materials and Resources for this class
        </Typography>
        {classroom && classroom.resources && classroom.resources?.length > 0 ? (
          classroom.resources.map((resource) => (
            <Link key={resource.link} href={resource.link} target="_blank">
              <Typography>{resource.title}</Typography>
            </Link>
          ))
        ) : (
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
        )}
      </Paper>
      <ResourceModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const ClassAnnouncementsContainer = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const { isLoading, data } = useAnnouncementQuery(id);

  if (isLoading)
    return (
      <>
        <Paper sx={{ padding: 4, my: 3, minHeight: "300px" }}>
          <Loading height="100px" />
        </Paper>
      </>
    );

  return (
    <>
      <Paper sx={{ padding: 4, my: 3, minHeight: "300px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Annoucements</Typography>
          {teacherRoles.includes(currentUser.role) && (
            <Button variant="contained" onClick={() => setOpen(true)}>
              <Add />
            </Button>
          )}
        </Box>
        {data && data?.length > 0 ? (
          data.map((announcement) => (
            <Paper
              elevation={0}
              sx={(theme) => ({
                mt: 2,
                p: 2,
                border: `1px solid ${theme.palette.grey[300]}`,
              })}
              key={announcement._id}
            >
              <Typography variant="button" color="primary">
                {announcement.title}
              </Typography>
              <Editor
                content={announcement.content}
                setContent={() => {}}
                readonly
              />
              <Box>
                <Chip
                  sx={{ mt: 2 }}
                  variant="outlined"
                  label={announcement.teacher.name}
                  icon={<Person />}
                />
              </Box>
            </Paper>
          ))
        ) : (
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
        )}
      </Paper>
      <AnnoucementModal open={open} onClose={() => setOpen(false)} />
    </>
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

  const allowedRoles = ["admin", "substitute", "teacher"];

  const dispatch = useAppDispatch();

  const sessionMutation = useSessionMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Session Created",
          content: "The session is created and will go live in a few moments",
        })
      );
    },
    onError: (error) => {
      dispatch(
        setErrorSnackbar({
          title: "Oops! Something went wrong!",
          content: (
            <>
              <Typography>{error?.message}</Typography>
              <Typography>
                This might be caused by invalid credentials. Make sure you log
                into Google (Step # 1) before creating a session
              </Typography>
            </>
          ),
        })
      );
    },
  });

  const createSession = () => {
    const payload = {
      classroomId: data?._id ?? "",
      classroomName: data?.name,
      teacherId: currentUser._id,
      teacherRole: currentUser.role,
      scheduledStartTime: data?.start.value,
    };
    sessionMutation.mutate({ data: payload });
  };

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
            {allowedRoles.includes(currentUser.role) ? (
              <Paper
                elevation={0}
                sx={(theme) => ({
                  padding: 3,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  my: 4,
                })}
              >
                <Typography variant="h5">Start Session</Typography>
                <Box my={2}>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    sx={{ my: 1 }}
                  >
                    Step # 1
                  </Typography>
                  <Button
                    href={`${API_BASE}/auth?id=${currentUser._id}`}
                    target="_blank"
                    variant="contained"
                  >
                    Login to Google
                  </Button>
                </Box>
                <Typography variant="body1" fontWeight={"bold"}>
                  Step # 2
                </Typography>
                <Button
                  loading={sessionMutation.isPending}
                  disabled={sessionMutation.isPending}
                  onClick={createSession}
                >
                  Create Session
                </Button>
              </Paper>
            ) : (
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
            )}
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
        <Grid size={{ xs: 12, lg: 8 }} order={{ xs: 2, md: 1 }}>
          <ClassResourcesContainer classroom={data} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }} order={{ xs: 1, md: 2 }}>
          <ClassAnnouncementsContainer />
        </Grid>
      </Grid>
    </>
  );
};
