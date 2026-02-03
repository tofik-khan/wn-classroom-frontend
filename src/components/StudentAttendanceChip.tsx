import { Chip } from "@mui/material";

export const StudentAttendanceChip = ({ attendance }) => {
  switch (attendance) {
    case "present":
      return <Chip label="P" color="success" />;
    case "absent":
      return <Chip label="A" color="error" />;
    case "excused":
      return <Chip label="E" color="default" />;
    case "tardy":
      return <Chip label="T" color="warning" />;
    default:
      return <Chip label="A" color="error" />;
  }
};
