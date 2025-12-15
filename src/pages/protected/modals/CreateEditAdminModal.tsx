import { useForm, Controller } from "react-hook-form";
import { Admin } from "@/types/admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  TextField,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "@/queries/admins";
import { useAuth0 } from "@auth0/auth0-react";

export const CreateEditAdminModal = ({
  open,
  onClose,
  admin,
  setAdmin,
}: {
  open: boolean;
  onClose: any;
  admin: Admin | null;
  setAdmin: any;
}) => {
  const editMode = !!admin;
  const { control, handleSubmit, reset } = useForm<Admin>();
  const createAdmin = useCreateAdminMutation();
  const updateAdmin = useUpdateAdminMutation();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const handleCreate = async (data: Admin) => {
    if (isAuthenticated) {
      const authToken = await getAccessTokenSilently();
      createAdmin.mutate({ authToken, data });
    }
  };

  const handleEdit = async (data: Admin) => {
    if (isAuthenticated) {
      const authToken = await getAccessTokenSilently();
      updateAdmin.mutate({ authToken, data: { ...data, _id: admin!._id } });
    }
  };

  const onSubmit = (data: Admin) => {
    editMode ? handleEdit(data) : handleCreate(data);
    onClose();
    setAdmin(null);
    reset();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setAdmin(null);
          reset();
          onClose();
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{`${editMode ? "Edit" : "Create"}`} Admin</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => {
              reset();
              setAdmin(null);
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
                  label="Name"
                  sx={{ width: "80%" }}
                />
              )}
              name="name"
              control={control}
              key={"name-input"}
              defaultValue={editMode ? admin.name : ""}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Email"
                    sx={{ width: "60%" }}
                  />
                )}
                name="email"
                control={control}
                key={"email-input"}
                defaultValue={editMode ? admin.email.split("@")[0] : ""}
              />
              <Typography>@ahmadiyya.us</Typography>
            </Box>
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  className="materialUIInput"
                  label="Title"
                  sx={{ width: "80%" }}
                />
              )}
              name="title"
              control={control}
              key={"title-input"}
              defaultValue={editMode ? admin.title : ""}
            />
            <Controller
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Switch disabled checked={field.value === true} />}
                  label="Superuser"
                />
              )}
              name="isSuperuser"
              control={control}
              key={"isSuperuser-input"}
              defaultValue={editMode ? admin.isSuperuser : false}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save changes</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
