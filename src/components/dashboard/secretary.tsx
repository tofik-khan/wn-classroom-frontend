import { useAppSelector } from "@/hooks";
import { useStudentsInJammatQuery } from "@/queries/secretaries";
import { Box, Tooltip, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import { User } from "@/types/user";
import { StudentAttendanceChip } from "../StudentAttendanceChip";

const StudentTable = () => {
  const { isLoading, data } = useStudentsInJammatQuery();

  // Extract all dates from students' sessions
  const dates =
    data &&
    data
      .map((student) => student.sessions?.map((session) => session.date))
      .flat();

  // Only keep unique dates
  const uniqueDates = dates?.filter((value, index, array) => {
    return value && array.indexOf(value) === index;
  });

  const attendanceColumns =
    uniqueDates
      ?.sort((a, b) => {
        return dayjs(a).isAfter(b) ? -1 : 1;
      })
      .map((date) => ({
        field: `attendance-${date}`,
        headerName: date,
        renderHeader: () => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>
              {dayjs(date).tz("America/New_York").format("MMM")}
            </Typography>
            <Typography>
              {dayjs(date).tz("America/New_York").format("DD")}
            </Typography>
          </Box>
        ),
        width: 150,
        renderCell: ({ row }: { row: User }) => {
          // A student can be in more than one class held on the same day
          const sessions =
            row.sessions?.filter((session) => session.date === date) ?? [];
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                height: "100%",
              }}
            >
              {sessions.map((session) => (
                <Tooltip
                  key={session.classroomId}
                  title={session.classroomName ?? ""}
                  enterTouchDelay={0}
                  arrow
                >
                  <span>
                    <StudentAttendanceChip attendance={session.attendance} />
                  </span>
                </Tooltip>
              ))}
            </Box>
          );
        },
      })) ?? [];

  const columns = [
    {
      field: "name",
      headerName: "Student Name",
      minWidth: 200,
    },
    {
      field: "waqfenauId",
      headerName: "Waqf-e-Nau ID",
      minWidth: 150,
    },
    {
      field: "jammat",
      headerName: "Jammat",
      minWidth: 150,
    },
    {
      field: "classrooms",
      headerName: "Classrooms",
      minWidth: 250,
      renderCell: ({ row }: { row: User }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {(row.classrooms?.length ?? 0) > 0 ? (
            row.classrooms?.map((classroom) => (
              <Typography key={classroom.value}>{classroom.label}</Typography>
            ))
          ) : (
            <Typography>
              Registration Complete
              <br />
              Pending Enrollment
            </Typography>
          )}
        </Box>
      ),
    },
    ...attendanceColumns,
  ];

  return (
    <DataGridPro
      loading={isLoading}
      rows={data ?? []}
      columns={columns}
      getRowId={(row) => row._id}
      getRowHeight={() => "auto"}
      initialState={{ pinnedColumns: { left: ["name"] } }}
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      localeText={{ noRowsLabel: "No Students Registered from this Jammat" }}
      sx={{
        [`& .${gridClasses.cell}`]: {
          py: 1,
        },
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
  );
};

export const SecretaryDashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Typography variant="h2">
        Assalamo Alaikum {currentUser.name.split(" ")[0] ?? ""} - Local
        Secretary {currentUser.jammat}
      </Typography>
      <StudentTable />
    </>
  );
};
