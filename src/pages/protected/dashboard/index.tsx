import { useAppSelector } from "@/hooks";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import {
  ImportContactsOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import { ClassCard } from "@/components/ClassCard";
import { useMyStudentsQuery } from "@/queries/parents";
import { Loading } from "@/components/Loading";
import { User } from "@/types/user";

const EmptyClassSection = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          my: 4,
          color: "text.secondary",
        }}
      >
        <ImportContactsOutlined sx={{ width: "100px", height: "100px" }} />
        <Typography>You are not enrolled in any classes yet.</Typography>
        <Typography>
          The Admin Team will add you in a class as soon as possible
        </Typography>
      </Box>
    </>
  );
};

const ClassContainer = ({ classrooms }) => {
  return (
    <>
      <Grid container>
        {classrooms.map((classroom) => (
          <Grid key={classroom.value} size={{ xs: 12, md: 6 }}>
            <ClassCard id={classroom.value} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const StudentDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { classrooms } = currentUser;
  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""}
      </Typography>
      <Typography variant="body1">
        Here's an overview of your learning journey
      </Typography>
      <Paper
        sx={(theme) => ({
          padding: 4,
          marginTop: 4,
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 2,
        })}
      >
        <Typography variant="h4">My Classes</Typography>
        <Typography variant="subtitle1">
          Your currently enrolled classes
        </Typography>
        {classrooms!.length > 0 ? (
          <ClassContainer classrooms={classrooms} />
        ) : (
          <EmptyClassSection />
        )}
      </Paper>
    </>
  );
};

const ParentDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const { isLoading: isLoadingMyStudents, data: myStudets } =
    useMyStudentsQuery();

  if (isLoadingMyStudents) return <Loading />;

  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""}
      </Typography>
      <Typography variant="body1">
        Here's an overview of your kids' learning journey
      </Typography>
      <Paper
        sx={(theme) => ({
          padding: 4,
          marginTop: 4,
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 2,
        })}
      >
        <Typography variant="h4">My Students</Typography>
        <Typography variant="subtitle1">
          The students who are connected to your account show up here
        </Typography>
        {(myStudets?.length || 0) > 0 ? (
          myStudets?.map((student) => (
            <MyStudentCard key={student._id} student={student} />
          ))
        ) : (
          <EmptyStudentCard />
        )}
      </Paper>
    </>
  );
};

const EmptyStudentCard = () => {
  return (
    <>
      <Paper
        elevation={0}
        sx={(theme) => ({
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${theme.palette.grey[300]}`,

          marginTop: 2,
          marginX: "4px",
        })}
      >
        <Typography>There are no students added</Typography>
        <Typography color="text.secondary" variant="caption" fontSize={"12px"}>
          If there is already a student account, reach out to the admin team to
          connect the two accounts together
        </Typography>
        <Divider sx={{ width: "50%", my: 2 }} textAlign="center">
          or
        </Divider>
        <Button variant="contained" sx={{ display: "flex", gap: 1 }}>
          <PersonAddAlt1Outlined /> Create Student
        </Button>
      </Paper>
    </>
  );
};

const MyStudentCard = ({ student }: { student: User }) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={(theme) => ({
          padding: 2,
          border: `1px solid ${theme.palette.grey[300]}`,

          marginTop: 2,
          marginX: "4px",
        })}
      >
        <Typography>{student.name}</Typography>
        <Typography>{student.email}</Typography>
        <Typography>{`${student.dob?.month} / ${student.dob?.year}`}</Typography>
      </Paper>
    </>
  );
};

export const PageDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  if (currentUser.role === "student") return <StudentDashboard />;
  if (currentUser.role === "parent") return <ParentDashboard />;
  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""}
      </Typography>
    </>
  );
};
