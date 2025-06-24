import { ApplicationStatus } from "@/components/dashboard/ApplicationStatus";
import { ImageKitBandwidthUsage } from "@/components/dashboard/ImageKitBandwidthUsage";
import { ImageKitStorageUsage } from "@/components/dashboard/ImageKitStorageUsage";
import { Notifications } from "@/components/dashboard/Notifications";
import { Grid, Paper, Typography } from "@mui/material";

export const PageDashboard = () => {
  return (
    <>
      <Grid container wrap="nowrap" direction={"row"} gap={2}>
        <Grid size={8}>
          <Paper sx={{ padding: 2 }} elevation={2}>
            <Typography variant="h5" my={2}>
              Usage & Status
            </Typography>
            <Grid container wrap="nowrap" direction={"row"} gap={2}>
              <Grid
                size={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: "200px",
                }}
              >
                <ImageKitStorageUsage />
                <ImageKitBandwidthUsage />
              </Grid>
              <Grid size={9}>
                <ApplicationStatus />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper sx={{ padding: 2 }} elevation={2}>
            <Typography variant="h5" my={2}>
              Notifications
            </Typography>
            <Notifications />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
