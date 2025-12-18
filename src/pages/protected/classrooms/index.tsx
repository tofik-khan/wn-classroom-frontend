import { useClassroomQuery } from "@/queries/classrooms";
import { Classroom } from "@/types/classroom";
import { Add, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { GridColDef, DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CreateClassroomModal } from "../modals/CreateClassroomModal";

export const PageClassroom = () => {
  const { isLoading, isRefetching, data } = useClassroomQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const columns: GridColDef<Classroom>[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ row }) => row.name,
      flex: 3,
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: ({ row }) => row.description,
      flex: 4,
    },
    {
      field: "googleDrive",
      headerName: "Google Drive ID",
      renderCell: ({ row }) => row.googleDrive,
      flex: 2,
    },
    {
      field: "start",
      headerName: "Start Time EST",
      renderCell: ({ row }) => row.start.label,
      flex: 2,
    },
    {
      field: "end",
      headerName: "End Time EST",
      renderCell: ({ row }) => row.end.label,
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton
          color={"primary"}
          onClick={() => {
            navigate(`/protected/classrooms/${row._id}`);
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
        <Typography variant="h2">Classrooms</Typography>
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
        getRowId={(row) => row._id ?? row.name}
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
      <CreateClassroomModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
