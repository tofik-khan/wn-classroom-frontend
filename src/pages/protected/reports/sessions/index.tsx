import { Loading } from "@/components/Loading";
import { useSessionReportQuery } from "@/queries/reports";
import { lateStartByTeacher } from "@/utils/datetime";
import { AccessTimeOutlined } from "@mui/icons-material";
import { Box, Chip, Paper, Typography } from "@mui/material";
import {
  DataGridPro,
  gridClasses,
  GridColDef,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
import { useNavigate, useParams } from "react-router";

const CustomFooterTotalComponent = () => {
  const apiRef = useGridApiContext();
  const filteredSortedRowIds = useGridSelector(
    apiRef,
    gridFilteredSortedRowIdsSelector,
  );

  // Calculate Totals
  const present = filteredSortedRowIds.reduce((sum, id) => {
    const row = apiRef.current.getRow(id);
    return sum + row.present;
  }, 0);

  const tardy = filteredSortedRowIds.reduce((sum, id) => {
    const row = apiRef.current.getRow(id);
    return sum + row.tardy;
  }, 0);

  const excused = filteredSortedRowIds.reduce((sum, id) => {
    const row = apiRef.current.getRow(id);
    return sum + row.excused;
  }, 0);

  const absent = filteredSortedRowIds.reduce((sum, id) => {
    const row = apiRef.current.getRow(id);
    return sum + row.absent;
  }, 0);

  return (
    <Box
      sx={(theme) => ({
        p: 1,
        display: "flex",
        justifyContent: "flex-end",
        border: `1px solid ${theme.palette.grey[200]}`,
      })}
    >
      <Typography sx={{ width: "120px", textAlign: "center" }}>
        {present}
      </Typography>
      <Typography sx={{ width: "120px", textAlign: "center" }}>
        {tardy}
      </Typography>
      <Typography sx={{ width: "120px", textAlign: "center" }}>
        {excused}
      </Typography>
      <Typography sx={{ width: "120px", textAlign: "center" }}>
        {absent}
      </Typography>
      <Typography sx={{ width: "120px", textAlign: "center" }}>
        {parseInt(`${present.valueOf()}`) +
          parseInt(`${tardy.valueOf()}`) +
          parseInt(`${excused.valueOf()}`) +
          parseInt(`${absent.valueOf()}`)}
      </Typography>
    </Box>
  );
};

export const PageSessionReport = () => {
  const { date } = useParams();
  const { isLoading, data } = useSessionReportQuery(date);
  const navigate = useNavigate();

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
        const lateStart = lateStartByTeacher(row.startTime);
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
            <Typography
              color={lateStart ? "warning" : "text.primary"}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {lateStart && <AccessTimeOutlined />}
              {`Actual: ${dayjs(row.startTime.actual).tz("America/New_York").format("HH:mm a z")}`}
            </Typography>
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
      field: "excused",
      headerName: "Excused",
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
            <Typography>{`${row.excused}`}</Typography>
            <Typography>{`(${((row.excused / row.totalStudents) * 100).toLocaleString("en", { maximumFractionDigits: 2 })}%)`}</Typography>
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
      headerName: "Total",
      headerAlign: "center",
      align: "center",
      minWidth: 120,
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
          onRowClick={({ row }) =>
            navigate(`/protected/reports/${date}/${row.classroomId}`)
          }
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
          slots={{
            footer: CustomFooterTotalComponent,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "linear-progress",
              noRowsVariant: "skeleton",
            },
            row: {
              style: {
                cursor: "pointer",
              },
            },
          }}
        />
      </Paper>
    </>
  );
};
