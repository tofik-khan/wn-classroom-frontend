import { Loading } from "@/components/Loading";
import { TIMEZONES } from "@/constants";
import { JAMMAT } from "@/constants/jammat";
import { useClassroomQuery } from "@/queries/classrooms";
import {
  useOneTeacherQuery,
  useTeacherUpdateMutation,
} from "@/queries/teachers";
import { Teacher } from "@/types/teacher";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const PageEditTeacher = () => {
  const { id } = useParams();
  const { isLoading, data } = useOneTeacherQuery(id);
  const { isLoading: isLoadingClassrooms, data: classrooms } =
    useClassroomQuery();
  const classroomsOptions =
    (classrooms &&
      classrooms.map((classroom) => ({
        label: classroom.name,
        value: classroom._id ?? "",
      }))) ??
    [];
  const { control, handleSubmit, reset } = useForm<Teacher>({
    defaultValues: data,
  });
  const navigate = useNavigate();
  const updateTeacher = useTeacherUpdateMutation({
    onSuccess: () => navigate("/protected/teachers"),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (data?.role) {
      reset({ role: data.role });
    }
  }, [data, reset]);

  const onSubmit = (data) => {
    /**
     * The form values are only updated when the user changes the value of the
     * field. This causes unchanged values to be undefined. If not removed, this
     * will remove the values from the database. The next line removes any values
     * that are undefined.
     */
    Object.keys(data).forEach((key) =>
      data[key] === undefined ? delete data[key] : {}
    );

    updateTeacher.mutate({
      data,
      id: id ?? "",
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Typography variant="h2">Edit Teacher:</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
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
                defaultValue={data?.name ?? ""}
              />
            )}
            name="name"
            control={control}
            key={"name-input"}
            defaultValue={data?.name ?? ""}
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
                  defaultValue={data?.email.split("@")[0]}
                />
              )}
              name="email"
              control={control}
              key={"email-input"}
              defaultValue={data?.email.split("@")[0]}
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
                defaultValue={data?.phone}
              />
            )}
            name="phone"
            control={control}
            key={"phone-input"}
            defaultValue={data?.phone}
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
                  {...field}
                  labelId="role-selection"
                  id="role-selection"
                  label="Role"
                >
                  <MenuItem value={"teacher"}>Teacher</MenuItem>
                  <MenuItem value={"substitute"}>Substitute</MenuItem>
                </Select>
              </FormControl>
            )}
            name="role"
            control={control}
            key={"role-input"}
          />
          <Controller
            render={({ field }) => (
              <Autocomplete
                className="materialUIInput"
                multiple
                options={classroomsOptions}
                loading={isLoadingClassrooms}
                defaultValue={data?.class}
                disableCloseOnSelect
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Class Assigned" />
                )}
              />
            )}
            name="class"
            control={control}
            key="class-input"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => {
                navigate("/protected/teachers");
              }}
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Save changes
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};
