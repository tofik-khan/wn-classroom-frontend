import { Editor } from "@/components/wysiwyg/editor";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useAnnouncementMutation } from "@/queries/announcements";
import { setErrorSnackbar, setSuccessSnackbar } from "@/reducers/snackbar";
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";

export const AnnoucementModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm();
  const { currentUser } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const createAnnouncement = useAnnouncementMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Announcement Created",
          content: "The announcement is sent to all users of this class",
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
    const payload = {
      ...data,
      duration: data.duration
        ? JSON.parse(data.duration)
        : { time: 1, unit: "day" },
      classroomId: id,
      teacher: {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
      },
    };
    createAnnouncement.mutate({ data: payload });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create Classroom</DialogTitle>
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
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel htmlFor="duration-selection">Duration</InputLabel>
                  <Select
                    labelId="duration-selection"
                    id="duration-selection"
                    label="Duration"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <MenuItem value={`{"time": 1, "unit": "day"}`}>
                      1 Day (24 Hours)
                    </MenuItem>
                    <MenuItem value={`{"time": 1, "unit": "week"}`}>
                      1 Week
                    </MenuItem>
                    <MenuItem value={`{"time": 1, "unit": "month"}`}>
                      1 Month
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              name="duration"
              control={control}
              key={"duration-input"}
            />
            <Controller
              render={({ field }) => (
                <Editor content={field.value} setContent={field.onChange} />
              )}
              name="content"
              control={control}
              key="content-input"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              loading={createAnnouncement.isPending}
              disabled={createAnnouncement.isPending}
              variant="contained"
              type="submit"
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
