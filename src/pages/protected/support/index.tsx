import { Loading } from "@/components/Loading";
import { useAdminsQuery } from "@/queries/admins";
import { useAllSupportCasesQuery } from "@/queries/support";
import { Support } from "@/types/support";
import {
  Box,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router";

export const PageSupport = () => {
  const [filter, setFilter] = useState("open");
  const { isLoading, isRefetching, data } = useAllSupportCasesQuery();
  const { data: admins, isLoading: isLoadingAdmins } = useAdminsQuery();
  const navigate = useNavigate();

  if (isLoading || !data || isLoadingAdmins) {
    return <Loading />;
  }

  const getChipColor = (status) => {
    switch (status) {
      case "pending":
        return "error";
        break;
      case "responded":
        return "warning";
        break;
      case "resolved":
        return "success";
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      field: "user",
      headerName: "User",
      renderCell: ({ row }: { row: Support }) => {
        return row.currentUser ? row.currentUser.name : row.name;
      },
      minWidth: 150,
    },
    {
      field: "message",
      headerName: "Message",
      renderCell: ({ row }: { row: Support }) => {
        return row.message;
      },
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row }: { row: Support }) => {
        return (
          <Chip
            variant="outlined"
            label={row.status}
            color={getChipColor(row.status)}
          />
        );
      },
      flex: 1,
    },
    {
      field: "assignedTo",
      headerName: "Assigned",
      renderCell: ({ row }: { row: Support }) => {
        return admins?.find((admin) => admin._id === row.assignedTo)?.name;
      },
      flex: 1,
    },
    {
      field: "created/updated",
      headerName: "Created Updated",
      renderCell: ({ row }: { row: Support }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography>
              {dayjs(row.createdAt).format("MM/DD/YYYY hh:mm a z")}
            </Typography>
            <Typography>
              {row.createdAt === row.updatedAt
                ? "No updates"
                : dayjs(row.updatedAt).format("MM/DD/YYYY hh:mm a z")}
            </Typography>
          </Box>
        );
      },
      flex: 1,
    },
  ];

  const cases = data.filter((supportCase) =>
    filter === "resolved"
      ? supportCase.status === "resolved"
      : supportCase.status !== "resolved",
  );

  return (
    <>
      <Typography variant="h2">Support Cases</Typography>
      <ToggleButtonGroup
        sx={{ my: 2 }}
        value={filter}
        exclusive
        onChange={(_, value) => setFilter(value)}
        color="primary"
      >
        <ToggleButton value="open">Open Cases</ToggleButton>
        <ToggleButton value="resolved">Resolved Cases</ToggleButton>
      </ToggleButtonGroup>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={cases ?? []}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        onRowClick={({ row }) => navigate(`/protected/support/${row._id}`)}
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
          row: {
            style: {
              cursor: "pointer",
            },
          },
        }}
      />
    </>
  );
};
