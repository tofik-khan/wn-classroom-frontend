import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        gap: 3,
        alignItems: "flex-start",
        borderRadius: 4,
        backgroundColor: color,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: "50%",
          backgroundColor: "#f3d1dc",
          color: "#8b1538",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FeatureCard;
