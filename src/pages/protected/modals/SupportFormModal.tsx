import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSupportMutation } from "@/queries/support";
import { setSuccessSnackbar, setErrorSnackbar } from "@/reducers/snackbar";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export const SupportFormModal = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

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
    createSupportCase.mutate({
      data: {
        ...data,
        currentUser,
        location: window.location,
      },
    });
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
