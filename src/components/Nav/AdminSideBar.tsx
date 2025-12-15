import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";

export const AdminSideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "fixed",
          top: 0,
          left: 0,
          width: "200px",
          height: "100vh",
          border: `1px solid ${theme.palette.grey[300]}`,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        })}
      >
        <Box
          sx={{ "&:hover": { cursor: "pointer" }, mt: 3, mb: 5 }}
          onClick={() => navigate("/protected/dashboard")}
        >
          <Typography>WN Classroom</Typography>
        </Box>
        {/* Admin Links */}
        <Box>
          {currentUser.role === "admin" && (
            <>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Classes
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Teachers
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Students
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Parents
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Un-Enrolled
              </Button>

              <Divider
                sx={{ my: 3 }}
                orientation="horizontal"
                variant="middle"
                flexItem
              />
              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/protected/admins")}
              >
                Admins
              </Button>
              <Button fullWidth sx={{ mt: 1 }} disabled>
                Reports
              </Button>
            </>
          )}
          {/* Parent Links */}
          {currentUser.role === "parent" && (
            <>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Teachers
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Students
              </Button>
            </>
          )}
          {/* Student Links */}
          {currentUser.role === "student" && (
            <>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                My Classes
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                My Attendance
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "30px",
          display: "flex",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <Button variant="contained" color="error" onClick={handleLogout}>
          <Logout /> Logout
        </Button>
      </Box>
    </>
  );
};
