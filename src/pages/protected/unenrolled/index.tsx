import { useClassroomQuery } from "@/queries/classrooms";
import {
  useEnrollInClassMutation,
  useUnenrolledUserQuery,
} from "@/queries/users";
import { User } from "@/types/user";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";

export const PageUnenrolled = () => {
  const { isLoading, isRefetching, data } = useUnenrolledUserQuery();
  const { isLoading: isLoadingClassrooms, data: classrooms } =
    useClassroomQuery();
  const classroomsOptions =
    (classrooms &&
      classrooms.map((classroom) => ({
        label: classroom.name,
        value: classroom._id ?? "",
      }))) ??
    [];

  const enrollInClass = useEnrollInClassMutation({
    onSuccess: () => console.log("Success"),
    onError: () => console.log("ERROR!"),
  });

  const handleClassUpdate = (id, classrooms) => {
    enrollInClass.mutate({
      classrooms: classrooms.map((classroom) => classroom.value),
      id,
    });
  };

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
      width: 175,
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
      flex: 4,
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
      field: "suggestedClass",
      headerName: "Requested Classes",
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
            {row.suggestedClass.map((classes) => (
              <Typography key={classes.value}>{classes.label}</Typography>
            ))}
            <Typography>Urdu Class: {row.urduClass}</Typography>
          </Box>
        );
      },
      width: 200,
    },
    {
      field: "classrooms",
      headerName: "Assigned Classes",
      renderCell: ({ row }: { row: User }) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Autocomplete
              sx={{ width: "100%" }}
              className="materialUIInput"
              multiple
              options={classroomsOptions}
              loading={isLoadingClassrooms}
              defaultValue={row?.classrooms}
              limitTags={1}
              disableCloseOnSelect
              isOptionEqualToValue={(opt, val) => opt === val}
              onChange={(_, option) => {
                handleClassUpdate(row._id, option);
              }}
              renderInput={(params) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <TextField {...params} label="Class Assigned" />
                </Box>
              )}
            />
          </Box>
        );
      },
      width: 500,
    },
  ];
  return (
    <>
      <Typography variant="h2">UnEnrolled</Typography>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id}
        rowHeight={200}
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
