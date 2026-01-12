import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const PageSchedule = () => {
  const dates = [
    "January, 24, 2026",
    "February, 14, 2026",
    "March, 14, 2026",
    "March, 28, 2026",
    "April, 11, 2026",
    "May, 23, 2026",
    "June, 13, 2026",
    "July, 11, 2026",
    "July, 18, 2026",
    "August, 8, 2026",
    "August, 29, 2026",
    "September, 12, 2026",
    "September, 26, 2026",
    "October, 24, 2026",
    "November, 7, 2026",
    "November, 21, 2026",
    "December, 12, 2026",
    "December, 19, 2026",
  ];
  return (
    <>
      <Typography variant="h2" my={3} textAlign={"center"}>
        Waqf-e-Nau Online Class Schedule
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          marginX: "auto",
          maxWidth: { md: "80%", xs: "100%" },
          marginY: 3,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Class #</TableCell>
              <TableCell>Class Date</TableCell>
              <TableCell>Start Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dates.map((date, index) => (
              <TableRow
                key={index}
                sx={(theme) => ({
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                    cursor: "pointer",
                  },
                })}
              >
                <TableCell>{index}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>11:00 am EST</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
