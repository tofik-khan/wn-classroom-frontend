import { useAppDispatch } from "@/hooks";
import { useClassroomResourceMutation } from "@/queries/classrooms";
import { setErrorSnackbar, setSuccessSnackbar } from "@/reducers/snackbar";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";

export const ResourceModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const createClassResource = useClassroomResourceMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Resource Created",
          content: "The link is added to the classroom",
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
    createClassResource.mutate({ data, id });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create Class Resource</DialogTitle>
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
              flexDirection: "row",
              gap: "24px",
            }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  className="materialUIInput"
                  label="Title"
                />
              )}
              name="title"
              control={control}
              key="title-input"
            />
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  className="materialUIInput"
                  label="Link"
                />
              )}
              name="link"
              control={control}
              key="link-input"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              loading={createClassResource.isPending}
              disabled={createClassResource.isPending}
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
