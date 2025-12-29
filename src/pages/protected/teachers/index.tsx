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
import { TIMEZONES } from "@/constants";
import { Teacher } from "@/types/teacher";

export const PageTeachers = () => {
  const { data, isLoading, isRefetching } = useTeacherQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const columns: GridColDef<Teacher>[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ row }) => (
        <Chip
          avatar={<Avatar alt={row.name} />}
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
      field: "timezone",
      headerName: "Timezone",
      renderCell: ({ row }) =>
        TIMEZONES.find((zone) => zone.value === row.timezone)?.label,
      flex: 3,
    },
    {
      field: "classes",
      headerName: "Classes",
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
            {row.classrooms?.map((classroom) => (
              <Typography key={classroom.value}>{classroom.label}</Typography>
            ))}
          </Box>
        );
      },

      flex: 3,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>{row.email}</Typography>
          <Typography color="secondary">{row.phone}</Typography>
        </Box>
      ),
      flex: 4,
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
        rowHeight={100}
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
