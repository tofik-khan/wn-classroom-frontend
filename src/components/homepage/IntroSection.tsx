import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

const IntroSection: React.FC = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 16, lg: 24 },  }}>
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
            <LaptopMacIcon
              sx={{
                fontSize: { xs: 140, md: 200 },
              }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2,
                backgroundColor: "#8b1538",
                "&:hover": { backgroundColor: "#6f102c" },
              }}
              href="/login"
            >
              Log in
            </Button>
          </Box>

          {/* Text Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Online classes for Waqf-e-Nau
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              This platform has been developed to support the educational and
              Tarbiyyat goals by providing a structured, secure, and organized
              environment for learning.
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              It enables teachers and administrators to guide students
              effectively while helping Waqf-e-Nau remain consistent in their
              academic and moral development through organized classes,
              assignments, and supervision.
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              The system is designed to complement existing departmental
              programs and operates under the guidance and objectives of the
              Waqf-e-Nau Department.
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default IntroSection;

