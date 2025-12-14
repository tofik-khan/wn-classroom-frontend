import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import AppLogo from "@/assets/mudir-logo.png";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminSideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

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
          <img src={AppLogo} width={150} height={70} />
        </Box>
        {/* WN Waqf-e-Ardhi Links */}
        <Box>
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
            Accounts
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/protected/waqfeardhi/applicants")}
          >
            Applicants
          </Button>
        </Box>
        <Divider
          sx={{ my: 3 }}
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        <Button fullWidth onClick={() => navigate("/protected/admins")}>
          Admins
        </Button>
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
