import { useTeacherQuery } from "@/queries/teachers";
import { Add, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { CreateTeacherModal } from "../modals/CreateTeacherModal";
import { useNavigate } from "react-router";

export const PageTeachers = () => {
  const { data, isLoading, isRefetching } = useTeacherQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ row }) => (
        <Chip
          avatar={<Avatar alt={row.name} src={row.image} />}
          label={row.name}
          variant="outlined"
        />
      ),
      flex: 3,
    },
    {
      field: "role",
      headerName: "Role",
      renderCell: ({ row }) =>
        row.role === "teacher" ? "Teacher" : "Substitute",
      flex: 2,
    },
    {
      field: "jammat",
      headerName: "Jammat",
      renderCell: ({ row }) => row.jammat,
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => row.email,
      flex: 4,
    },
    {
      field: "phone",
      headerName: "Phone",
      renderCell: ({ row }) => row.phone,
      flex: 3,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton
          color={"primary"}
          onClick={() => {
            navigate(`/protected/teachers/${row._id}`);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 3,
          my: 1,
        }}
      >
        <Typography variant="h2">Teachers</Typography>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ display: "flex", gap: 1 }}
        >
          <Add />
          Create
        </Button>
      </Box>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
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
      <CreateTeacherModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
