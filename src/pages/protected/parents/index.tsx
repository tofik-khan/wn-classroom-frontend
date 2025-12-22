import { useParentsQuery } from "@/queries/parents";
import { User } from "@/types/user";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";

export const PageParents = () => {
  const { isLoading, isRefetching, data } = useParentsQuery();
  const navigate = useNavigate();

  const columns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ row }: { row: User }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>{row.name}</Typography>
        </Box>
      ),
      flex: 4,
    },
    {
      field: "membercode",
      headerName: "Member Code",
      renderCell: ({ row }: { row: User }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>{row.membercode}</Typography>
        </Box>
      ),
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: ({ row }: { row: User }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>{row.email}</Typography>
        </Box>
      ),
      flex: 4,
    },
    {
      field: "phone",
      headerName: "Phone",
      renderCell: ({ row }: { row: User }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>{row.phone}</Typography>
        </Box>
      ),
      flex: 4,
    },
    {
      field: "jammat",
      headerName: "Jammat",
      renderCell: ({ row }: { row: User }) => {
        return row.jammat;
      },
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton
          color={"primary"}
          onClick={() => {
            navigate(`/protected/parents/${row._id}`);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h2">Parents:</Typography>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id}
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
    </>
  );
};
