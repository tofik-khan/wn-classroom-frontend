import { useOneClassroomQuery } from "@/queries/classrooms";
import { Typography, Paper, Box } from "@mui/material";
import { Loading } from "./Loading";
import { getNextSession } from "@/utils/datetime";
import { AccessTimeOutlined, CalendarTodayOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

export const ClassCard = ({ id }) => {
  const { isLoading, isRefetching, data } = useOneClassroomQuery(id);
  const nextSession = getNextSession(data?.schedule);
  const navigate = useNavigate();

  if (isLoading || isRefetching)
    return (
      <Paper
        elevation={0}
        sx={(theme) => ({
          padding: 2,
          border: `1px solid ${theme.palette.grey[300]}`,
          minHeight: "150px",
          marginTop: 2,
          marginX: "4px",
        })}
      >
        <Loading height="150px" />
      </Paper>
    );

  return (
    <>
      <Paper
        sx={(theme) => ({
          padding: 2,
          border: `1px solid ${theme.palette.grey[300]}`,
          minHeight: "150px",
          marginTop: 2,
          marginX: "4px",
          "&:hover": {
            cursor: "pointer",
          },
        })}
        onClick={() => navigate(`/protected/dashboard/class/${id}`)}
      >
        <Typography
          variant="caption"
          textTransform={"uppercase"}
          sx={(theme) => ({
            color: theme.palette.primary.main,
          })}
          gutterBottom
        >
          {data?.name}
        </Typography>
        <Typography>{data?.description}</Typography>

        <Box sx={{ marginTop: 3 }}>
          <Typography display={"flex"} gap={1} alignItems={"center"}>
            <CalendarTodayOutlined />
            {nextSession ? nextSession.format("MM/DD/YYYY") : "Not Scheduled"}
          </Typography>
          <Typography
            display={"flex"}
            gap={1}
            alignItems={"center"}
            marginTop={2}
          >
            <AccessTimeOutlined /> {data?.start.label} EST
          </Typography>
        </Box>
      </Paper>
    </>
  );
};
