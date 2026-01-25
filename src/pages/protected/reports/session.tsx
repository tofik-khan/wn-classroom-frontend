import { Loading } from "@/components/Loading";
import { useSessionReportQuery } from "@/queries/reports";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
import { useParams } from "react-router";

export const PageSessionReport = () => {
  const { date } = useParams();
  const { isLoading, data } = useSessionReportQuery(date);

  if (isLoading) return <Loading />;

  const columns: GridColDef[] = [
    {
      field: "classroomName",
      headerName: "Classroom",
      minWidth: 300,
    },
    {
      field: "teacher.name",
      headerName: "Teacher",
      minWidth: 300,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography>{row.teacher?.name ?? "Admin"}</Typography>
            <Typography>
              <Chip
                label={row.teacherRole}
                color={row.teacherRole === "teacher" ? "success" : "warning"}
              />
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "startTime",
      headerName: "Class Time",
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography>{`Scheduled: ${dayjs(row.startTime.scheduled).tz("America/New_York").format("HH:mm a z")}`}</Typography>
            <Typography>{`Actual: ${dayjs(row.startTime.actual).tz("America/New_York").format("HH:mm a z")}`}</Typography>
          </Box>
        );
      },
    },
    {
      field: "present",
      headerName: "Present",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="success">{`${row.present}`}</Typography>
            <Typography color="success">{`(${((row.present / row.totalStudents) * 100).toLocaleString("en", { maximumFractionDigits: 2 })}%)`}</Typography>
          </Box>
        );
      },
    },
    {
      field: "tardy",
      headerName: "Tardy",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="warning">{`${row.tardy}`}</Typography>
            <Typography color="warning">{`(${((row.tardy / row.totalStudents) * 100).toLocaleString("en", { maximumFractionDigits: 2 })}%)`}</Typography>
          </Box>
        );
      },
    },
    {
      field: "absent",
      headerName: "Absent",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="error">{`${row.absent}`}</Typography>
            <Typography color="error">{`(${((row.absent / row.totalStudents) * 100).toLocaleString("en", { maximumFractionDigits: 2 })}%)`}</Typography>
          </Box>
        );
      },
    },
    {
      field: "totalStudents",
      headerName: "Total Students",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
  ];

  return (
    <>
      <Typography variant="h2">{`Session Report - ${dayjs(date).format("MM/DD/YYYY")}`}</Typography>
      <Paper sx={{ my: 3, p: 4 }}>
        <DataGridPro
          loading={isLoading}
          rows={data ?? []}
          columns={columns}
          getRowId={(row) => `${row.classroomId}---${row.startTime.actual}`}
          rowHeight={100}
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
          autosizeOnMount
          sx={{
            marginBottom: 10,
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
      </Paper>
    </>
  );
};
