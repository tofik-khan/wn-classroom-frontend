import { useAppDispatch } from "@/hooks";
import { useSupportMutation } from "@/queries/support";
import { setSuccessSnackbar, setErrorSnackbar } from "@/reducers/snackbar";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const ContactModal = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();

  const createSupportCase = useSupportMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Message Sent",
          content: "A team member may contact you to get more information",
        })
      );
      onClose();
    },
    onError: (error) => {
      dispatch(
        setErrorSnackbar({
          title: "Oops! Something went wrong!",
          content: error?.message,
        })
      );
    },
  });

  const onSubmit = (data) => {
    createSupportCase.mutate({ data });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Tell us how we can assist you?</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              reset();
              onClose();
            }}
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
            dividers
            sx={{
              pl: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  fullWidth
                  className="materialUIInput"
                  label="Name"
                />
              )}
              name="name"
              control={control}
              key="name-input"
            />
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  fullWidth
                  className="materialUIInput"
                  label="Email"
                />
              )}
              name="email"
              control={control}
              key="email-input"
            />
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  fullWidth
                  multiline
                  className="materialUIInput"
                  label="Message"
                  rows={5}
                />
              )}
              name="message"
              control={control}
              key="message-input"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              loading={createSupportCase.isPending}
              disabled={createSupportCase.isPending}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
