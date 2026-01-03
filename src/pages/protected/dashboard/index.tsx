import { useAppSelector } from "@/hooks";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  ImportContactsOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import { ClassCard } from "@/components/ClassCard";
import { useMyStudentsQuery } from "@/queries/parents";
import { Loading } from "@/components/Loading";
import { User } from "@/types/user";
import { CreateStudentByParentModal } from "../modals/CreateStudentByParentModal";
import { useState } from "react";
import { useClassroomQuery } from "@/queries/classrooms";

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
  const [open, setOpen] = useState(false);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4">My Students</Typography>
            <Typography variant="subtitle1">
              The students who are connected to your account show up here
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ display: "flex", gap: 1 }}
            onClick={() => setOpen(true)}
          >
            <PersonAddAlt1Outlined /> Create Student
          </Button>
        </Box>
        {(myStudets?.length || 0) > 0 ? (
          <Grid container>
            {myStudets?.map((student) => (
              <Grid size={{ xs: 12, md: 6 }}>
                <MyStudentCard key={student._id} student={student} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyStudentCard />
        )}
      </Paper>
      {myStudets?.map((student) => {
        return (
          <>
            <Paper
              sx={(theme) => ({
                padding: 4,
                marginTop: 4,
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: 2,
              })}
            >
              <Typography variant="h4">
                {student.name.split(" ")[0]}&apos;s Classes
              </Typography>
              <Typography variant="subtitle1">
                The currently enrolled classes for{" "}
                <strong>{student.name}</strong>
              </Typography>
              {student.classrooms!.length > 0 ? (
                <ClassContainer classrooms={student.classrooms} />
              ) : (
                <EmptyClassSection />
              )}
            </Paper>
          </>
        );
      })}
      <CreateStudentByParentModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const EmptyStudentCard = () => {
  const [open, setOpen] = useState(false);
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
        <Button
          variant="contained"
          sx={{ display: "flex", gap: 1 }}
          onClick={() => setOpen(true)}
        >
          <PersonAddAlt1Outlined /> Create Student
        </Button>
      </Paper>
      <CreateStudentByParentModal open={open} onClose={() => setOpen(false)} />
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
          minHeight: "100px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
        })}
      >
        <Avatar sx={{ width: "50px", height: "50px" }} />
        <Box>
          <Typography>{student.name}</Typography>
          <Typography>{student.email}</Typography>
          <Typography>{`${student.dob?.month} / ${student.dob?.year}`}</Typography>
        </Box>
      </Paper>
    </>
  );
};

export const TeacherDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { classrooms } = currentUser;
  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""} - Teacher
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
        {classrooms!.length > 0 ? (
          <ClassContainer classrooms={classrooms} />
        ) : (
          <EmptyClassSection />
        )}
      </Paper>
    </>
  );
};

const SubstituteDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { isLoading, data: classroomsData } = useClassroomQuery();

  if (isLoading) return <Loading />;

  const classrooms = classroomsData?.map((classroom) => ({
    label: classroom.name,
    value: classroom._id,
  }));

  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name.split(" ")[0] ?? ""} - Substitute Teacher
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
        {classrooms!.length > 0 ? (
          <ClassContainer classrooms={classrooms} />
        ) : (
          <EmptyClassSection />
        )}
      </Paper>
    </>
  );
};

export const PageDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  if (currentUser.role === "student") return <StudentDashboard />;
  if (currentUser.role === "parent") return <ParentDashboard />;
  if (currentUser.role === "teacher") return <TeacherDashboard />;
  if (currentUser.role === "substitute") return <SubstituteDashboard />;
  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""}
      </Typography>
    </>
  );
};
