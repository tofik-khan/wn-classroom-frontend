import { Loading } from "@/components/Loading";
import { useClassroomSessionReport } from "@/queries/session";
import { lateStartByTeacher } from "@/utils/datetime";
import { Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
import { useParams } from "react-router";

export const PageSingleSessionReport = () => {
  const { date, classroomId } = useParams();
  const { isLoading, data } = useClassroomSessionReport(date, classroomId);

  if (isLoading || !data) return <Loading />;

  const { startTime, attendance } = data;
  const lateStart = lateStartByTeacher(startTime);

  const present = attendance.filter(
    (student) => student.attendance === "present",
  );
  const tardy = attendance.filter((student) => student.attendance === "tardy");
  const excused = attendance.filter(
    (student) => student.attendance === "excused",
  );
  const absent = attendance.filter(
    (student) => student.attendance === "absent",
  );

  return (
    <>
      <Typography variant="h2">Class Report</Typography>
      <Paper sx={{ my: 2, p: 3 }}>
        <Typography variant="h6">Class Times:</Typography>
        <Typography>
          Scheduled Start Time:{" "}
          {dayjs(startTime.scheduled)
            .tz("America/New_York")
            .format("MM/DD/YYYY HH:mm a z")}
        </Typography>
        <Typography>
          Actual Start Time:{" "}
          {dayjs(startTime.actual)
            .tz("America/New_York")
            .format("MM/DD/YYYY HH:mm a z")}
          <Typography mx={1} component={"span"} color="warning">
            {lateStart ? "(Late Start)" : ""}
          </Typography>
        </Typography>
      </Paper>
      <Paper sx={{ my: 2, p: 3 }}>
        <Typography variant="h6">Attendance</Typography>
        <Grid container>
          <Grid size={{ md: 3 }}>
            <Typography variant="subtitle1">
              Present - {present.length}
            </Typography>
            {present.map((student) => {
              return (
                <Typography mx={1} my={1} key={student.studentId}>
                  {student.studentName}
                </Typography>
              );
            })}
          </Grid>
          <Grid size={{ md: 3 }}>
            <Typography variant="subtitle1">Tardy - {tardy.length}</Typography>
            {tardy.map((student) => {
              return (
                <Typography mx={1} my={1} key={student.studentId}>
                  {student.studentName}
                </Typography>
              );
            })}
          </Grid>
          <Grid size={{ md: 3 }}>
            <Typography variant="subtitle1">
              Excused - {excused.length}
            </Typography>
            {excused.map((student) => {
              return (
                <Typography mx={1} my={1} key={student.studentId}>
                  {student.studentName}
                </Typography>
              );
            })}
          </Grid>
          <Grid size={{ md: 3 }}>
            <Typography variant="subtitle1">
              Absent - {absent.length}
            </Typography>
            {absent.map((student) => {
              return (
                <Typography mx={1} my={1} key={student.studentId}>
                  {student.studentName}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
