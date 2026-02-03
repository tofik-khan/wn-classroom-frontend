import { useStudentsInClassroomQuery } from "@/queries/classrooms";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { useParams } from "react-router";
import { User } from "@/types/user";
import { StudentAttendanceChip } from "@/components/StudentAttendanceChip";

export const ClassRosterModal = ({ open, onClose }) => {
  const { id } = useParams();

  const { isLoading, data } = useStudentsInClassroomQuery(id ?? "");

  // Extract all dates from students' sessions
  let dates =
    data &&
    data
      .map((student) => student.sessions?.map((session) => session.date))
      .flat();

  // Only keep unique dates
  const uniqueDates = dates?.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  const attendanceColumns =
    uniqueDates
      ?.sort((a, b) => {
        return dayjs(a).isAfter(b) ? -1 : 1;
      })
      .map((date) => ({
        field: `attendance-${date}`,
        headerName: date,
        renderHeader: () => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              {dayjs(date).tz("America/New_York").format("MMM")}
            </Typography>
            <Typography>
              {dayjs(date).tz("America/New_York").format("DD")}
            </Typography>
          </Box>
        ),
        renderCell: ({ row }: { row: User }) => {
          return (
            <StudentAttendanceChip
              attendance={
                row.sessions?.find((session) => session.date === date)
                  ?.attendance ?? "absent"
              }
            />
          );
        },
      })) ?? [];

  const columns = [
    {
      field: "name",
      headerName: "Student Name",
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Student / Parent Email",
      minWidth: 300,
      renderCell: ({ row }) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography>{row.email}</Typography>
              <Typography>{row.parentEmail}</Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
    },
    {
      field: "jammat",
      headerName: "Jamamt",
      minWidth: 200,
    },
    ...attendanceColumns,
  ];
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
        <DialogTitle>Class Roster</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          sx={{
            pl: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <DataGridPro
            loading={isLoading}
            rows={data ?? []}
            columns={columns}
            getRowId={(row) => row._id}
            rowHeight={50}
            disableColumnMenu
            disableColumnResize
            disableRowSelectionOnClick
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.columnSeparator}`]: {
                display: "none",
              },
            }}
            slotProps={{
              loadingOverlay: {
                variant: "linear-progress",
                noRowsVariant: "skeleton",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
