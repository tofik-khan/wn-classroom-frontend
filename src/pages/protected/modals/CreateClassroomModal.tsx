import { MultiDatePicker } from "@/components/DatePicker";
import { TIMEOPTIONS } from "@/constants";
import { useClassroomMutation } from "@/queries/classrooms";
import { Classroom } from "@/types/classroom";
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
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const CreateClassroomModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const createClassroom = useClassroomMutation({
    onSuccess: () => {
      onClose();
      reset();
      setSchedule([]);
    },
    onError: (error) => console.log("error", error),
  });

  const { control, handleSubmit, reset } = useForm<Classroom>();
  const [schedule, setSchedule] = useState<Dayjs[]>([]);

  const onSubmit = (data: Classroom) => {
    createClassroom.mutate({ data: { ...data, schedule } });
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
        maxWidth="md"
      >
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
                  label="Name"
                />
              )}
              name="name"
              control={control}
              key="name-input"
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
                        value={"syllabus"}
                        label="Syllabus"
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
              defaultValue="syllabus"
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
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="End Time (EST)"
                          required
                        />
                      )}
                    />
                  )}
                  name="end"
                  control={control}
                  key="end-input"
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save changes</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
