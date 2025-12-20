import { Badge, Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";
import AppLogo from "@/assets/app-logomark.png";
import { useUnenrolledUserQuery } from "@/queries/users";

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

  /**
   * Get Unenrolled users to display badge next to unenrolled link
   */
  const { data: unenrolled } = useUnenrolledUserQuery();

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
          <img src={AppLogo} width={"150px"} />
        </Box>
        {/* Admin Links */}
        <Box>
          {currentUser.role === "admin" && (
            <>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/protected/classrooms")}
              >
                Classes
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/protected/teachers")}
              >
                Teachers
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/protected/students")}
              >
                Students
              </Button>
              <Button disabled fullWidth sx={{ mt: 1 }}>
                Parents
              </Button>
              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate("/protected/unenrolled")}
              >
                <Badge badgeContent={unenrolled?.length ?? 0} color="primary">
                  Un-Enrolled
                </Badge>
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
