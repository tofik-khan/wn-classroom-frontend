import { Loading } from "@/components/Loading";
import { useTeachersAnnualReportQuery } from "@/queries/reports";
import { Paper, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";

export const PageTeacherReport = () => {
  const year = "2026";

  const { isLoading, data } = useTeachersAnnualReportQuery(year);

  if (isLoading) return <Loading />;

  const columns = [
    {
      field: "teacher.name",
      headerName: "Name",
      valueGetter: (_, row) => row.teacher.name,
      width: 300,
    },
    {
      field: "metrics.sessionsTaught",
      headerName: "Sessions Taught",
      valueGetter: (_, row) => row.metrics.sessionsTaught,
      width: 150,
    },
    {
      field: "metrics.onTimeSessions",
      headerName: "On Time",
      valueGetter: (_, row) => row.metrics.onTimeSessions,
    },
  ];

  return (
    <>
      <Paper sx={{ my: 3, p: 4 }}>
        <Typography variant="h2">Teacher Reports - {year}</Typography>
        <DataGridPro
          loading={isLoading}
          rows={data || []}
          columns={columns}
          getRowId={(row) => row.teacher._id}
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
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
