import { useStudentsQuery } from "@/queries/students";
import { User } from "@/types/user";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export const PageStudents = () => {
  const { data, isLoading, isRefetching } = useStudentsQuery();
  const navigate = useNavigate();

  const columns = [
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
          <Typography>{row.membercode}</Typography>
          <Typography>{row.waqfenauId}</Typography>
        </Box>
      ),
      flex: 4,
    },
    {
      field: "email",
      headerName: "Email & Phone",
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
          <Typography>{row.phone}</Typography>
        </Box>
      ),
      flex: 4,
    },
    {
      field: "gender",
      headerName: "Gender",
      renderCell: ({ row }: { row: User }) => {
        return row.gender;
      },
      width: 100,
    },
    {
      field: "parentEmail",
      headerName: "Parent Contact",
      renderCell: ({ row }: { row: User }) => {
        return row.parentEmail;
      },
      width: 200,
    },
    {
      field: "jammat",
      headerName: "Jammat",
      renderCell: ({ row }: { row: User }) => {
        return row.jammat;
      },
      width: 100,
    },
    {
      field: "age",
      headerName: "Age",
      renderCell: ({ row }: { row: User }) => {
        const today = dayjs();
        const dob = dayjs(`${row.dob?.month}/01/${row.dob?.year}`, "M/DD/YYYY");

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography>{`${today.diff(dob, "years")} years`}</Typography>
            <Typography>{dob.format("M/YYYY")}</Typography>
          </Box>
        );
      },
      width: 100,
    },
    {
      field: "classrooms",
      headerName: "Assigned Classes",
      renderCell: ({ row }: { row: User }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {row.classrooms?.map((classroom) => {
              return (
                <Typography key={classroom.value}>{classroom.label}</Typography>
              );
            })}
          </Box>
        );
      },
      flex: 4,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <IconButton
          color={"primary"}
          onClick={() => {
            navigate(`/protected/students/${row._id}`);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h2">Students</Typography>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={
          data?.filter((student) => (student.classrooms?.length ?? 0) > 0) ?? []
        }
        columns={columns}
        getRowId={(row) => row._id}
        rowHeight={150}
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
