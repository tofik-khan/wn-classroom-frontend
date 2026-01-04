import React from "react";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import WNLogo from "/assets/wn-logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const IntroSection: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/protected/dashboard",
      },
    });
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 16, lg: 24 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Illustration */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={WNLogo} width={"140px"} />
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                mt: 2,
              }}
            >
              Log in / Register
            </Button>
          </Box>

          {/* Text Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Online classes for Waqf&#8209;e&#8209;Nau
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              The National Waqfe Nau Department, USA holds bi-weekly classes on
              this platform for Waqifeen-e-Nau children to study and learn the
              prescribed syllabus. These classes are for Waqifeen-e-Nau boys
              ages 4 to 21. These classes cover the syllabus and include
              interactive discussions on various Tarbiyyat topics.
            </Typography>
            <Typography variant="body1">
              For Waqifaat Classes, organized and taught by Lajna Imaillah USA,
              please visit{" "}
              <Link
                href="https://www.waqfenau.us/bi-weekly-online-classes-girls/"
                target="_blank"
              >
                Waqf-e-Nau Girls page on the Website
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntroSection;
