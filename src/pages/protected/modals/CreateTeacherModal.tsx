import { Loading } from "@/components/Loading";
import { TIMEZONES } from "@/constants";
import { JAMMAT } from "@/constants/jammat";
import { useClassroomQuery } from "@/queries/classrooms";
import { useTeachersMutation } from "@/queries/teachers";
import { Teacher } from "@/types/teacher";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
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
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const CreateTeacherModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {
  const { isLoading: isLoadingClassrooms, data: classrooms } =
    useClassroomQuery();
  const classroomsOptions =
    (classrooms &&
      classrooms.map((classroom) => ({
        label: classroom.name,
        value: classroom._id ?? "",
      }))) ??
    [];
  const createTeacher = useTeachersMutation({
    onSuccess: () => {
      onClose();
      reset();
    },
    onError: (error) => console.log(`error`, error),
  });
  const { control, handleSubmit, reset, getValues } = useForm<Teacher>();

  const onSubmit = (data: Teacher) => {
    createTeacher.mutate({ data });
  };

  if (isLoadingClassrooms) return <Loading />;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          reset();
          onClose();
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create Teacher</DialogTitle>
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
                  label="Name"
                  sx={{ width: "80%" }}
                />
              )}
              name="name"
              control={control}
              key={"name-input"}
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
              />
              <Typography>@ahmadiyya.us</Typography>
            </Box>
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  {...field}
                  className="materialUIInput"
                  label="Phone"
                  sx={{ width: "80%" }}
                />
              )}
              name="phone"
              control={control}
              key={"phone-input"}
            />
            <Controller
              render={({ field }) => (
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel htmlFor="jammat-selection">Jammat</InputLabel>
                  <Select
                    labelId="jammat-selection"
                    id="jammat-selection"
                    value={field.value}
                    label="Jammat"
                    onChange={(event) => field.onChange(event.target.value)}
                  >
                    <MenuItem disabled value="">
                      Select One...
                    </MenuItem>
                    {JAMMAT.map((folder) => (
                      <MenuItem value={folder.value}>{folder.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="jammat"
              control={control}
              key={"jammat-input"}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel htmlFor="timezone-selection">Timezone</InputLabel>
                  <Select
                    labelId="timezone-selection"
                    id="timezone-selection"
                    value={field.value}
                    label="Timezone"
                    onChange={(event) => field.onChange(event.target.value)}
                  >
                    <MenuItem disabled value="">
                      Select One...
                    </MenuItem>
                    {TIMEZONES.map((time) => (
                      <MenuItem value={time.value}>{time.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="timezone"
              control={control}
              key={"timezone-input"}
              defaultValue=""
            />
            <Controller
              render={({ field }) => (
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel htmlFor="role-selection">Role</InputLabel>
                  <Select
                    labelId="role-selection"
                    id="role-selection"
                    value={field.value}
                    label="Role"
                    onChange={(event) => field.onChange(event.target.value)}
                  >
                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                    <MenuItem value={"substitute"}>Substitute</MenuItem>
                  </Select>
                </FormControl>
              )}
              name="role"
              control={control}
              key={"role-input"}
              defaultValue="teacher"
            />
            <Controller
              render={({ field }) => (
                <Autocomplete
                  className="materialUIInput"
                  multiple
                  options={classroomsOptions}
                  onChange={(_, option) => {
                    field.onChange(option);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Class Assigned"
                      helperText={
                        "Substitutes have all classes visible to them without assignment"
                      }
                    />
                  )}
                />
              )}
              name="class"
              control={control}
              key="class-input"
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
