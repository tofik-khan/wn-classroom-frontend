import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Close, Logout, Menu } from "@mui/icons-material";

import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";
import AppLogo from "@/assets/app-logomark.png";
import { useUnenrolledUserQuery } from "@/queries/users";
import { useState } from "react";

const MenuItems = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  /**
   * Get Unenrolled users to display badge next to unenrolled link
   */
  const { data: unenrolled } = useUnenrolledUserQuery();

  return (
    <>
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
            <Button
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => navigate("/protected/parents")}
            >
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
    </>
  );
};

export const AdminSideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      {/* Mobile Navigation */}
      <AppBar
        component={"nav"}
        position="sticky"
        sx={{
          borderRadius: "4px",
          backgroundColor: "white",
          display: { xs: "block", md: "none" },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box onClick={() => navigate("/")} sx={{ py: 1 }}>
              <img src={AppLogo} width={"150px"} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button>
                <Menu onClick={handleDrawerToggle} />
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "300px" },
        }}
        slotProps={{
          root: {
            keepMounted: true,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button>
            <Close sx={{ p: 2 }} onClick={handleDrawerClose} />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "100%",
            gap: 4,
            px: 4,
          }}
        >
          <MenuItems />
        </Box>
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 20,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            borderTop: `1px solid ${theme.palette.grey[300]}`,
          })}
        >
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "black",
              my: 1,
              p: 2,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleLogout}
          >
            <Avatar />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography m={0} variant="subtitle2">{`${
                currentUser.name ?? ""
              }`}</Typography>
              <Chip
                color="primary"
                size="small"
                label={
                  <Typography color="white" variant="subtitle2">
                    {currentUser?.role}
                  </Typography>
                }
              />
            </Box>
            <Logout color="error" sx={{ ml: 2 }} />
          </Button>
        </Box>
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "250px" },
        }}
        open
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ "&:hover": { cursor: "pointer" }, mt: 3, mb: 5 }}
            onClick={() => navigate("/protected/dashboard")}
          >
            <img src={AppLogo} width={"150px"} />
          </Box>
          <MenuItems />
        </Box>
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 20,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            borderTop: `1px solid ${theme.palette.grey[300]}`,
          })}
        >
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "black",
              my: 1,
              p: 2,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleLogout}
          >
            <Avatar />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography m={0} variant="subtitle2">{`${
                currentUser.name ?? ""
              }`}</Typography>
              <Chip
                color="primary"
                size="small"
                label={
                  <Typography color="white" variant="subtitle2">
                    {currentUser?.role}
                  </Typography>
                }
              />
            </Box>
            <Logout color="error" sx={{ ml: 2 }} />
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
