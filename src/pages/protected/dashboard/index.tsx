import { useAppSelector } from "@/hooks";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { ImportContactsOutlined } from "@mui/icons-material";
import { ClassCard } from "@/components/ClassCard";

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

export const PageDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  if (currentUser.role === "student") return <StudentDashboard />;
  return (
    <>
      <Typography variant="h2">
        Welcome {currentUser.name?.split(" ")[0] ?? ""}
      </Typography>
    </>
  );
};
