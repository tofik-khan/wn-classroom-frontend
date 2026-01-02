import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  AppBar as MUIAppBar,
  Toolbar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import ClassroomLogo from "/assets/app-logomark.png";

export const AppBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/protected/dashboard",
      },
    });
  };

  const LoginButton = ({
    variant = "outlined",
  }: {
    variant?: "outlined" | "contained";
  }) => (
    <Button variant={variant} onClick={handleLogin}>
      <PersonOutlineIcon /> Login
    </Button>
  );

  const NavItems = () => (
    <>
      <Button target="_blank" href="https://www.waqfenau.us/">
        Waqf e Nau Website
      </Button>
      <Button target="_blank" href="https://www.waqfenau.us/wn-syllabus/">
        Syllabus
      </Button>
    </>
  );

  return (
    <>
      <MUIAppBar
        component="nav"
        position="sticky"
        sx={{ borderRadius: "4px", backgroundColor: "white" }}
      >
        {/** Desktop NavBar */}
        <Container maxWidth="xl" sx={{ display: { md: "block", xs: "none" } }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => navigate("/")}
              >
                <img src={ClassroomLogo} width={"150px"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <NavItems />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <LoginButton />
              </Box>
            </Box>
          </Toolbar>
        </Container>

        {/** Mobile NavBar */}
        <Container sx={{ display: { xs: "block", md: "none" } }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box onClick={() => navigate("/")}>
                <img src={ClassroomLogo} width={"150px"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button>
                  <MenuIcon onClick={() => setOpen(true)} />
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </MUIAppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button>
            <Close sx={{ p: 2 }} onClick={() => setOpen(false)} />
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
          <NavItems />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LoginButton />
        </Box>
      </Drawer>
    </>
  );
};

export default AppBar;
