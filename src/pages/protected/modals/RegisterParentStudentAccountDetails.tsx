import { useAppSelector } from "@/hooks";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

export const RegisterParentStudentAccountDetails = ({
  role,
  open,
  onClose,
}) => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {role === "parent" ? "Parent" : "Student"} Account
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent
          sx={{
            pl: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant="body1">
            {role === "parent"
              ? "Your account will be created with parental controls"
              : "Your account will be created as a student"}
          </Typography>
          <Typography>
            <strong>{currentUser.email}</strong> is the {role} email.
          </Typography>
          <Typography>
            {role === "parent"
              ? "As a parent, you can add your dependants in your dashboard and use your account to join classes for your children"
              : "As a student, you can join the classes directly from your account"}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
