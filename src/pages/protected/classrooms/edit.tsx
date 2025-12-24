import { MultiDatePicker } from "@/components/DatePicker";
import { Loading } from "@/components/Loading";
import { TIMEOPTIONS } from "@/constants";
import {
  useOneClassroomQuery,
  useUpdateClassroomMutation,
} from "@/queries/classrooms";
import { Classroom } from "@/types/classroom";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export const PageEditClassroom = () => {
  const { id } = useParams();
  const { isLoading, data } = useOneClassroomQuery(id);
  const navigate = useNavigate();
  const updateClassroom = useUpdateClassroomMutation({
    onSuccess: () => {
      console.log("yayee!");
      navigate("/protected/classrooms");
    },
    onError: () => {
      console.log("Error");
    },
  });

  const { control, handleSubmit } = useForm<Classroom>({
    defaultValues: data,
  });
  const [schedule, setSchedule] = useState<Dayjs[]>([]);

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

    updateClassroom.mutate({ data: { ...data, schedule }, id: id ?? "" });
  };

  useEffect(() => {
    if (data && data.schedule)
      setSchedule(data.schedule.map((day) => dayjs(day)));
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Typography variant="h2">Edit Classroom</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Name"
              />
            )}
            name="name"
            control={control}
            key="name-input"
            defaultValue={data?.name}
          />
          <Controller
            render={({ field }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Description"
                multiline
              />
            )}
            name="description"
            control={control}
            key="description-input"
            defaultValue={data?.description}
          />
          <Controller
            render={({ field }) => {
              return (
                <FormControl>
                  <FormLabel>Classroom Type</FormLabel>
                  <RadioGroup
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    row
                  >
                    <FormControlLabel
                      value={"regular"}
                      label="Regular"
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value={"urdu"}
                      label="Urdu"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
              );
            }}
            name="type"
            control={control}
            key={"type-input"}
            defaultValue="regular"
            rules={{ required: true }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <InputLabel>Class Schedule</InputLabel>
              <MultiDatePicker values={schedule} setValues={setSchedule} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "250px",
              }}
            >
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    className="materialUIInput"
                    onChange={(_, option) => field.onChange(option)}
                    options={TIMEOPTIONS}
                    defaultValue={data?.start}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Start Time (EST)"
                        required
                      />
                    )}
                  />
                )}
                name="start"
                control={control}
                key="start-input"
              />
              <Controller
                render={({ field }) => (
                  <Autocomplete
                    className="materialUIInput"
                    options={TIMEOPTIONS}
                    onChange={(_, option) => field.onChange(option)}
                    defaultValue={data?.end}
                    renderInput={(params) => (
                      <TextField {...params} label="End Time (EST)" required />
                    )}
                  />
                )}
                name="end"
                control={control}
                key="end-input"
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => {
                navigate("/protected/classrooms");
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
