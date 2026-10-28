import { Loading } from "@/components/Loading";
import { JAMMAT } from "@/constants/jammat";
import { useStudentAnnualReportQuery } from "@/queries/reports";
import {
  Autocomplete,
  Box,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import { useState } from "react";

export const PageStudentsReport = () => {
  const year = "2026";
  const { isLoading, data } = useStudentAnnualReportQuery(year);
  const [filter, setFilter] = useState({
    jammat: "",
  });

  if (isLoading) return <Loading />;

  const columns: GridColDef[] = [
    {
      field: "student.name",
      headerName: "Name",
      valueGetter: (_, row) => row.student.name,
      width: 200,
    },
    {
      field: "student.membercode",
      headerName: "AMI Code",
      valueGetter: (_, row) => row.student.membercode,
    },
    {
      field: "student.waqfenauId",
      headerName: "WN ID",
      valueGetter: (_, row) => row.student.waqfenauId,
    },
    {
      field: "student.jammat",
      headerName: "Jammat",
      valueGetter: (_, row) => row.student.jammat,
      width: 200,
    },
    {
      field: "syllabus",
      headerName: "Syllabus Class",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Chip
                variant="outlined"
                color="success"
                label={row.attendance.syllabus.present}
              />
              <Chip
                variant="outlined"
                color="warning"
                label={row.attendance.syllabus.tardy}
              />
              <Chip
                variant="outlined"
                color="error"
                label={row.attendance.syllabus.absent}
              />
            </Box>
          </Box>
        );
      },
    },
    {
      field: "urdu",
      headerName: "Urdu Class",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Chip
                variant="outlined"
                color="success"
                label={row.attendance.urdu.present}
              />
              <Chip
                variant="outlined"
                color="warning"
                label={row.attendance.urdu.tardy}
              />
              <Chip
                variant="outlined"
                color="error"
                label={row.attendance.urdu.absent}
              />
            </Box>
          </Box>
        );
      },
    },
  ];

  const filteredData = data.filter(
    (row) => filter.jammat === "" || row.student.jammat === filter.jammat,
  );

  return (
    <>
      <Paper sx={{ my: 3, p: 4 }}>
        <Typography variant="h2">Student Reports - {year}</Typography>
        <Box sx={{ py: 4 }}>
          <Autocomplete
            className="materialUIInput"
            options={JAMMAT}
            value={
              JAMMAT.find((jammat) => jammat.value === filter.jammat) ?? null
            }
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            onChange={(_, option) => {
              setFilter({ ...filter, jammat: option?.value || "" });
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Jammat / Chapter" />
            )}
          />
        </Box>
        <DataGridPro
          loading={isLoading}
          rows={filteredData || []}
          columns={columns}
          getRowId={(row) => row.student._id}
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
