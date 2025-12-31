import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
        padding: 2,
        minHeight: "120px",
        backgroundColor: theme.palette.common.white,
        gap: 2,
      })}
    >
      <Box
        sx={(theme) => ({
          borderRadius: "50%",
          height: "5px",
          width: "5px",
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        })}
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
