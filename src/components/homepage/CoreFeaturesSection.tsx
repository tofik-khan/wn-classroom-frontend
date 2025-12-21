import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Classroom Management",
    description:
      "All assigned classes are visible in one place, including schedules, instructors, and course materials. Students are automatically enrolled based on departmental assignment. Administrators can add substitute instructors.",
    icon: <SchoolIcon fontSize="large" />,
    color: "#f9f0f2",
  },
  {
    title: "Online Classes",
    description:
      "Join live online classes with a single click. Classes may include audio, video, and screen sharing as directed by the instructor.",
    icon: <VideocamIcon fontSize="large" />,
    color: "#f9f0f2",
  },
  {
    title: "Direct Communication",
    description:
      "Receive important class announcements and updates directly within the platform. Communication is moderated and role-based.",
    icon: <ChatBubbleOutlineIcon fontSize="large" />,
    color: "#f9f0f2",
  },
  {
    title: "Progress & Attendance Tracking",
    description:
      "Attendance and participation are recorded for each class. Students and authorized users can view progress over time.",
    icon: <BarChartIcon fontSize="large" />,
    color: "#f9f0f2",
  },
];

const CoreFeaturesSection: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ py: 5, backgroundColor: "#f9f0f2" }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="left"
        gutterBottom
        sx={{px: 12}}
      >
        Core Features
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4, px: 12 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoreFeaturesSection;
