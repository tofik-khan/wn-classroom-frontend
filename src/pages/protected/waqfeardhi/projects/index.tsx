import { LazyImage } from "@/components/LazyImage";
import { Loading } from "@/components/Loading";
import {
  useProjectsQuery,
  useUpdateProjectSortOrderMutation,
} from "@/queries/waqfeardhi/projects";
import { getRowSortOrder } from "@/utils/dataGrid";
import { Add, CancelOutlined, CheckCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const PageProjects = () => {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useProjectsQuery();
  const [rows, setRows] = useState(data || []);
  const updateProjectSortOrder = useUpdateProjectSortOrderMutation();

  useEffect(() => {
    if (data) setRows(data);
  }, [data, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const columns: GridColDef[] = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      renderCell: ({ row }) => (
        <LazyImage
          src={row.thumbnail}
          defaultImage={""}
          style={{ width: "150px", height: "100px", objectFit: "cover" }}
        />
      ),
      width: 160,
    },
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.title}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            })}
          >
            {row.subtitle}
          </Typography>
        </Box>
      ),
      flex: 3,
    },
    {
      field: "duration",
      headerName: "Duration",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.duration}
          </Typography>
        </Box>
      ),
      flex: 2,
    },
    {
      field: "audience",
      headerName: "Audience",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.audience}
          </Typography>
        </Box>
      ),
      flex: 2,
    },
    {
      field: "slug",
      headerName: "Slug",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.slug}
          </Typography>
        </Box>
      ),
      width: 150,
    },
    {
      field: "sponsor",
      headerName: "Sponsor",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.sponsor.name}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            })}
          >
            {row.sponsor.email}
          </Typography>
        </Box>
      ),
      flex: 3,
    },
    {
      field: "badge",
      headerName: "Badge",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.badge}
          </Typography>
        </Box>
      ),
      flex: 1,
    },
    {
      field: "published",
      headerName: "Published",
      renderCell: ({ row }) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {row.published ? (
              <CheckCircle color="success" />
            ) : (
              <CancelOutlined color="error" />
            )}
          </Box>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 3, my: 1 }}
      >
        <Typography variant="h2">Waqf-e-Ardhi Projects</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/protected/waqfeardhi/projects/new")}
        >
          <Add />
          Create Project
        </Button>
      </Box>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={rows.map((project) => ({
          ...project,
          __reorder__: `${project.title}`,
        }))}
        rowReordering
        onRowOrderChange={(params) => {
          const updatedRows = getRowSortOrder(params, data);
          setRows(updatedRows);
          updateProjectSortOrder.mutate({
            data: updatedRows.map((row) => ({
              _id: row._id,
              sortOrder: row.sortOrder,
            })),
          });
        }}
        rowHeight={100}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
        onRowClick={({ row }) =>
          navigate(`/protected/waqfeardhi/projects/${row._id}`)
        }
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
          [`& .${gridClasses.row}`]: {
            "&:hover": {
              cursor: "pointer",
            },
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
