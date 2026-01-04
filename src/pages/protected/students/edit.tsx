import { Loading } from "@/components/Loading";
import { GENDERS, MONTHS, YEARS } from "@/constants";
import { JAMMAT } from "@/constants/jammat";
import { useAppDispatch } from "@/hooks";
import { useClassroomQuery } from "@/queries/classrooms";
import {
  useOneStudentsQuery,
  useStudentUpdateMutation,
} from "@/queries/students";
import { setSuccessSnackbar, setErrorSnackbar } from "@/reducers/snackbar";
import { User } from "@/types/user";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export const PageEditStudent = () => {
  const { id } = useParams();
  const { isLoading, data } = useOneStudentsQuery(id);

  const { isLoading: isLoadingClassrooms, data: classrooms } =
    useClassroomQuery();
  const classroomsOptions =
    (classrooms &&
      classrooms.map((classroom) => ({
        label: classroom.name,
        value: classroom._id ?? "",
      }))) ??
    [];

  const { control, handleSubmit } = useForm<User>({
    defaultValues: {
      ...data,
    },
  });

  const dispatch = useAppDispatch();
  const updateStudent = useStudentUpdateMutation({
    onSuccess: () => {
      dispatch(
        setSuccessSnackbar({
          title: "Student Updated",
          content: "The student's account is updated",
        })
      );
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

  const navigate = useNavigate();

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

    updateStudent.mutate({
      data: {
        ...data,
        jammat: data.jammat,
      },
      id: id ?? "",
    });
  };

  if (isLoading) return <Loading />;

  const selectedJammat =
    JAMMAT.find((jammat) => jammat.value === data?.jammat) ?? JAMMAT[0];

  const selectedMonth =
    MONTHS.find((month) => month.value === (data?.dob?.month ?? 0)) ??
    MONTHS[0];

  return (
    <>
      <Typography variant="h2">Edit Student:</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="Name"
                defaultValue={data?.name ?? ""}
              />
            )}
            name="name"
            control={control}
            key={"name-input"}
            defaultValue={data?.name ?? ""}
          />
          <Controller
            render={({ field }) => (
              <Autocomplete
                sx={{ width: "200px" }}
                className="materialUIInput"
                options={MONTHS}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                defaultValue={selectedMonth}
                renderInput={(params) => (
                  <TextField {...params} label="DOB - Month" />
                )}
              />
            )}
            name="dob.month"
            control={control}
            key="dob-month-input"
            defaultValue={selectedMonth.value}
          />
          <Controller
            render={({ field }) => (
              <Autocomplete
                sx={{ width: "150px" }}
                className="materialUIInput"
                options={YEARS}
                defaultValue={data?.dob?.year}
                getOptionLabel={(option) => `${option}`}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="DOB - Year" />
                )}
              />
            )}
            name="dob.year"
            control={control}
            key="dob-year-input"
            defaultValue={data?.dob?.year}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Controller
            render={({ field }) => (
              <Autocomplete
                sx={{ width: "150px" }}
                className="materialUIInput"
                options={GENDERS}
                defaultValue={GENDERS.find(
                  (gender) => gender.value === data?.gender
                )}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Gender" />
                )}
              />
            )}
            name="gender"
            control={control}
            key="dob-year-input"
            defaultValue={data?.gender}
          />
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="Member Code"
                defaultValue={data?.membercode ?? ""}
              />
            )}
            name="membercode"
            control={control}
            key={"membercode-input"}
            defaultValue={data?.membercode ?? ""}
          />
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                label="Waqf-e-Nau ID"
                defaultValue={data?.waqfenauId ?? ""}
              />
            )}
            name="waqfenauId"
            control={control}
            key={"waqfenauId-input"}
            defaultValue={data?.waqfenauId ?? ""}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Controller
            render={({ field }) => (
              <Autocomplete
                className="materialUIInput"
                multiple
                options={classroomsOptions}
                loading={isLoadingClassrooms}
                defaultValue={data?.classrooms}
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
            name="classrooms"
            control={control}
            key="classrooms-input"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                defaultValue={data?.phone ?? ""}
              />
            )}
            name="phone"
            control={control}
            key={"phone-input"}
            defaultValue={data?.phone ?? ""}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Parent Email"
                defaultValue={data?.parentEmail ?? ""}
              />
            )}
            name="parentEmail"
            control={control}
            key={"parentEmail-input"}
            defaultValue={data?.parentEmail ?? ""}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Controller
            render={({ field }) => (
              <Autocomplete
                sx={{ width: "500px" }}
                className="materialUIInput"
                options={JAMMAT}
                defaultValue={selectedJammat}
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Jammat / Chapter" />
                )}
              />
            )}
            name="jammat"
            control={control}
            key="jammat-input"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button
            onClick={() => {
              navigate("/protected/students");
            }}
          >
            Cancel
          </Button>
          <Button
            loading={updateStudent.isPending}
            disabled={updateStudent.isPending}
            variant="outlined"
            type="submit"
          >
            Save changes
          </Button>
        </Box>
      </form>
    </>
  );
};
