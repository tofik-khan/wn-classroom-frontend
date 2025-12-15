import { useAdminsQuery } from "@/queries/admins";
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
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import { CreateEditAdminModal } from "./modals/CreateEditAdminModal";
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const PageAdmins = () => {
  const {
    data: admins,
    isLoading: isLoadingAdmins,
    isRefetching: isRefetchingAdmins,
  } = useAdminsQuery();
  const [openCreateAdminDialog, setOpenCreateAdminDialog] = useState(false);
  const [admin, setAdmin] = useState(null);

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
      renderCell: ({ row }) => row.index,
      width: 50,
      headerAlign: "center",
      align: "center",
    },
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
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => row.email,
      flex: 4,
    },
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ row }) => row.title,
      flex: 3,
    },
    {
      field: "isSuperuser",
      headerName: "Role",
      renderCell: ({ row }) =>
        row.isSuperuser ? (
          <Chip label={"Super User"} color="primary" />
        ) : (
          <Chip label={"Admin"} color="secondary" />
        ),
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton
          disabled={row.isSuperuser}
          color={"primary"}
          onClick={() => {
            setAdmin(row);
            setOpenCreateAdminDialog(true);
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
        <Typography variant="h2">Admins:</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenCreateAdminDialog(true)}
          sx={{ display: "flex", gap: 1 }}
        >
          <Add />
          Create Admin
        </Button>
      </Box>
      <DataGridPro
        loading={isLoadingAdmins || isRefetchingAdmins}
        rows={
          (admins && admins.map((admin, index) => ({ ...admin, index }))) ?? []
        }
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
      <CreateEditAdminModal
        open={openCreateAdminDialog}
        onClose={() => setOpenCreateAdminDialog(false)}
        admin={admin}
        setAdmin={setAdmin}
      />
    </>
  );
};
