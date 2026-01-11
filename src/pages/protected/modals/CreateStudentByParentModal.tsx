import { MONTHS, YEARS } from "@/constants";
import { JAMMAT } from "@/constants/jammat";
import { useAppDispatch } from "@/hooks";
import { useClassroomQuery } from "@/queries/classrooms";
import { useMyStudentsMutation } from "@/queries/parents";
import { useMembercodesQuery } from "@/queries/users";
import { setSuccessSnackbar, setErrorSnackbar } from "@/reducers/snackbar";
import { User } from "@/types/user";
import { useAuth0 } from "@auth0/auth0-react";
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
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const CreateStudentByParentModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { user } = useAuth0();
  const { control, handleSubmit, reset } = useForm<User>();
  const dispatch = useAppDispatch();
  const { data: membercodes } = useMembercodesQuery();
  const createStudent = useMyStudentsMutation({
    onSuccess: () => {
      reset();
      dispatch(
        setSuccessSnackbar({
          title: "Student Created",
          content:
            "The student account is created. The admin team will assign a class in a few days",
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

  const { isLoading: isLoadingClassrooms, data: classrooms } =
    useClassroomQuery();
  const classroomsOptions =
    (classrooms &&
      classrooms
        .filter((classroom) => classroom.type === "syllabus")
        .map((classroom) => ({
          label: classroom.name,
          value: classroom._id ?? "",
        }))) ??
    [];

  const urduClassOptions = [
    {
      label: "Not right now",
      value: "none",
    },
    {
      label: "Beginner Level",
      value: "beginner",
    },
    {
      label: "Intermediate Level",
      value: "intermediate",
    },
  ];

  const onSubmit = (data: User) => {
    const payload = {
      ...data,
      parentEmail: user?.email,
    };
    createStudent.mutate({ data: payload });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          reset();
          onClose();
        }}
        fullWidth
        maxWidth="sm"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add Student</DialogTitle>
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
              render={({ field, fieldState }) => (
                <TextField
                  required
                  {...field}
                  className="materialUIInput"
                  label="Name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              name="name"
              control={control}
              key="name-input"
              rules={{ required: "This is a required field" }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="materialUIInput"
                  label="Student's Email"
                />
              )}
              name="email"
              control={control}
              key="email-input"
            />
            <Controller
              render={({ field, fieldState }) => (
                <Autocomplete
                  className="materialUIInput"
                  options={JAMMAT}
                  value={
                    JAMMAT.find((jammat) => jammat.value === field.value) ??
                    null
                  }
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  onChange={(_, option) => {
                    field.onChange(option?.value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Jammat / Chapter"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
              name="jammat"
              control={control}
              key="jammat-input"
              rules={{
                required: "Please select one Option",
              }}
            />
            <Controller
              render={({ field }) => {
                return (
                  <FormControl>
                    <FormLabel>I am a ...</FormLabel>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      row
                    >
                      <FormControlLabel
                        value={"male"}
                        label={"Boy"}
                        control={<Radio />}
                      />
                    </RadioGroup>
                    <Typography variant="caption" color={"text.secondary"}>
                      The Online Classes are currently only available for
                      Waqf-e-Nau Boys
                    </Typography>
                  </FormControl>
                );
              }}
              name="gender"
              control={control}
              key={"gender-input"}
              defaultValue="male"
              rules={{ required: true }}
            />
            <Controller
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    fullWidth
                    {...field}
                    required
                    className="materialUIInput"
                    label="Member Code"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                );
              }}
              name="membercode"
              control={control}
              key={"membercode-input"}
              rules={{
                required: "This is a required field",
                validate: (value) =>
                  membercodes.includes(value)
                    ? "This membercode already exists. If the student has already created their account, please reach out to the admin team to connect the two accounts"
                    : true,
              }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  className="materialUIInput"
                  label="Phone Number"
                />
              )}
              name="phone"
              control={control}
              key={"phone-input"}
            />
            <Controller
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  required
                  {...field}
                  className="materialUIInput"
                  label="Waqf-e-Nau ID"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              name="waqfenauId"
              control={control}
              key={"waqfenauId-input"}
              rules={{
                required: "This is a required field",
              }}
            />
            <Controller
              render={({ field, fieldState }) => (
                <Autocomplete
                  className="materialUIInput"
                  multiple
                  options={classroomsOptions}
                  loading={isLoadingClassrooms}
                  value={field.value}
                  disableCloseOnSelect
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  onChange={(_, option) => {
                    field.onChange(option);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!fieldState.error}
                      label="Choose Classes"
                      helperText={
                        fieldState.error?.message ??
                        "Select the class that you think is the most appropriate for you. It may be a year above or below your actual age group"
                      }
                    />
                  )}
                />
              )}
              name="suggestedClass"
              control={control}
              key="suggestedClass-input"
              rules={{
                required: "Please select one Option",
              }}
            />
            <Controller
              render={({ field, fieldState }) => (
                <Autocomplete
                  className="materialUIInput"
                  options={urduClassOptions}
                  value={
                    urduClassOptions.find((opt) => opt.value === field.value) ??
                    null
                  }
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  onChange={(_, option) => {
                    field.onChange(option?.value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!fieldState.error}
                      label="Choose Urdu Class"
                      helperText={
                        fieldState.error?.message ??
                        "Urdu Classes are offered for Beginners and Intermediate students"
                      }
                    />
                  )}
                />
              )}
              name="urduClass"
              control={control}
              key="urduClass-input"
              rules={{
                required: "Please select one Option",
              }}
            />
            <Box sx={{ my: 2, gap: 2, display: "flex" }}>
              <Controller
                render={({ field, fieldState }) => (
                  <Autocomplete
                    className="materialUIInput"
                    options={MONTHS}
                    value={
                      MONTHS.find((opt) => opt.value === field.value) ?? null
                    }
                    sx={{ width: "50%" }}
                    isOptionEqualToValue={(opt, val) => opt.value === val.value}
                    onChange={(_, option) => {
                      field.onChange(option?.value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!fieldState.error}
                        required
                        label="Month of Birth"
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                name="dob.month"
                control={control}
                key="dob-month-input"
                rules={{
                  required: "Please select one Option",
                }}
              />
              <Controller
                render={({ field, fieldState }) => (
                  <Autocomplete
                    className="materialUIInput"
                    getOptionLabel={(option) => `${option}`}
                    options={YEARS}
                    value={field.value}
                    sx={{ width: "50%" }}
                    isOptionEqualToValue={(opt, val) =>
                      opt.valueOf === val.valueOf
                    }
                    onChange={(_, option) => {
                      field.onChange(option);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!fieldState.error}
                        required
                        label="Year of Birth"
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
                name="dob.year"
                control={control}
                key="dob-year-input"
                rules={{
                  required: "Please select one Option",
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Add Student</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
