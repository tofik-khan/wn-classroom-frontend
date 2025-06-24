import { useDashboardNotificationsQuery } from "@/queries/mudir/dashboard";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { CelebrationOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { useAdminsQuery } from "@/queries/mudir/admins";

export const Notifications = () => {
  const { data, isLoading } = useDashboardNotificationsQuery();
  const { data: admins, isLoading: isLoadingAdmins } = useAdminsQuery();

  if (isLoading || !data || isLoadingAdmins || !admins) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (data.length < 1) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <CelebrationOutlined fontSize="large" color="primary" />
          <Typography variant="body2">No new notifications :)</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      {data.map((notification) => {
        const admin = admins.find(
          (admin) => admin.email === notification.createdBy
        );
        return (
          <>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ color: "text.secondary", mb: 1 }}>
                  {dayjs(notification.createdAt).format("MM/DD/YYYY HH:mm a z")}
                </Typography>
                <Typography fontWeight={"bold"}>
                  {notification.title}
                </Typography>
                <Typography sx={{ marginBottom: 1 }}>
                  {notification.body}
                </Typography>
                <Chip
                  variant="outlined"
                  label={admin?.name}
                  avatar={<Avatar src={admin?.image || ""} />}
                />
              </CardContent>
            </Card>
          </>
        );
      })}
    </>
  );
};
