import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "@/types/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";
import { JAMMAT } from "@/constants/jammat";
import { MONTHS, YEARS } from "@/constants";
import { useMembercodesQuery, useUserMutation } from "@/queries/users";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useClassroomQuery } from "@/queries/classrooms";
import { InfoOutline } from "@mui/icons-material";
import { RegisterParentStudentAccountDetails } from "./modals/RegisterParentStudentAccountDetails";

export const PageRegister = () => {
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const { control, handleSubmit, watch } = useForm<User>({
    defaultValues: {
      role: "parent",
      parentEmail: "",
      membercode: "",
    },
  });
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.user);
  const [btn, setBtn] = useState({ loading: false, error: "" });
  const navigate = useNavigate();
  const updateUser = useUserMutation({
    onSuccess: () => {
      setBtn({ loading: false, error: "" });
      navigate("/protected/dashboard");
    },
    onError: () => {
      console.log("ERROR!!");
      setBtn({
        loading: false,
        error:
          "There was an unknown error with your submission, please call the IT Team",
      });
    },
  });

  const role = watch("role");

  const handleUpdate = async (data: User) => {
    setBtn({ loading: true, error: "" });
    if (isAuthenticated) {
      updateUser.mutate({
        data: {
          ...data,
          urduClass: data.urduClass ?? "none",
          email: currentUser!.email,
        },
      });
    }
  };

  return (
    <>
      <Typography variant="h2">Registeration Form</Typography>
      <form noValidate onSubmit={handleSubmit(handleUpdate)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            render={({ field }) => {
              return (
                <FormControl>
                  <RadioGroup
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    row
                  >
                    <FormControlLabel
                      value={"parent"}
                      label="Parent"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value={"student"}
                      label="Student"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              );
            }}
            name="role"
            control={control}
            key={"role-input"}
            defaultValue="student"
            rules={{ required: true }}
          />
          <Paper
            elevation={2}
            sx={{ p: 5, mt: 2, width: "360px", borderRadius: 2 }}
          >
            <Typography variant="h4" fontSize={24}>
              Create a {role} account{" "}
              <InfoOutline
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => setOpenInfoDialog(true)}
              />
            </Typography>
            <Box sx={{ my: 2 }}>
              <Controller
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...field}
                    className="materialUIInput"
                    label="Name"
                  />
                )}
                name="name"
                control={control}
                key={"name-input"}
                rules={{ required: "This is a required field" }}
              />
            </Box>
            <Box sx={{ my: 2 }}>
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
                rules={{ required: "This is a required field" }}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                render={({ field }) => {
                  return (
                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        row
                      >
                        <FormControlLabel
                          value={"male"}
                          label={role === "student" ? "Boy" : "Father"}
                          control={<Radio />}
                        />
                        {role === "parent" && (
                          <FormControlLabel
                            value={"female"}
                            label={"Mother"}
                            control={<Radio />}
                          />
                        )}
                      </RadioGroup>
                      {role === "student" && (
                        <Typography variant="caption" color={"text.secondary"}>
                          The Online Classes are currently only available for
                          Waqf-e-Nau Boys
                        </Typography>
                      )}
                    </FormControl>
                  );
                }}
                name="gender"
                control={control}
                key={"gender-input"}
                defaultValue="male"
                rules={{ required: true }}
              />
            </Box>
            {role === "parent" ? (
              <ParentQuestionaire control={control} />
            ) : role === "student" ? (
              <StudentQuestionaire control={control} />
            ) : (
              <></>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={btn.loading}
            >
              Save changes
            </Button>
          </Paper>
        </Box>
      </form>
      <RegisterParentStudentAccountDetails
        role={role}
        open={openInfoDialog}
        onClose={() => setOpenInfoDialog(false)}
      />
    </>
  );
};

const ParentQuestionaire = ({ control }) => {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              required
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? ""}
              className="materialUIInput"
              label="Member Code"
            />
          )}
          name="membercode"
          control={control}
          key={"membercode-input"}
          rules={{ required: "This is a required field" }}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field, fieldState }) => (
            <TextField
              fullWidth
              required
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? ""}
              className="materialUIInput"
              label="Phone Number"
            />
          )}
          name="phone"
          control={control}
          key={"phone-input"}
          rules={{ required: "This is a required field" }}
        />
      </Box>
    </>
  );
};

const StudentQuestionaire = ({ control }) => {
  const { data: membercodes } = useMembercodesQuery();
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
  return (
    <>
      <Box sx={{ my: 2 }}>
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
            validate: (value) =>
              membercodes.includes(value)
                ? "This membercode already exists"
                : true,
          }}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              className="materialUIInput"
              label="Parent Email"
            />
          )}
          name="parentEmail"
          control={control}
          key={"parentEmail-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              fullWidth
              required
              {...field}
              className="materialUIInput"
              label="Phone Number"
            />
          )}
          name="phone"
          control={control}
          key={"phone-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Controller
          render={({ field }) => (
            <TextField
              fullWidth
              required
              {...field}
              className="materialUIInput"
              label="Waqf-e-Nau ID"
            />
          )}
          name="waqfenauId"
          control={control}
          key={"waqfenauId-input"}
        />
      </Box>
      <Box sx={{ my: 2 }}>
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
      </Box>
      <Box sx={{ my: 2 }}>
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
      </Box>
      <Box sx={{ my: 2, gap: 2, display: "flex" }}>
        <Controller
          render={({ field, fieldState }) => (
            <Autocomplete
              className="materialUIInput"
              options={MONTHS}
              value={MONTHS.find((opt) => opt.value === field.value) ?? null}
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
        />
        <Controller
          render={({ field, fieldState }) => (
            <Autocomplete
              className="materialUIInput"
              getOptionLabel={(option) => `${option}`}
              options={YEARS}
              value={field.value}
              sx={{ width: "50%" }}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
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
        />
      </Box>
    </>
  );
};
