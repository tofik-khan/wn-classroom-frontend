import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";

import {
  LocalizationProvider,
  StaticDatePicker,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderRadius: "50%",
  }),
}));

export const MultiDatePicker = ({ values, setValues }) => {
  const isSelected = (date: Dayjs) => values.some((d) => d.isSame(date, "day"));

  const toggleDate = (date: Dayjs) => {
    const normalized = date.startOf("day");

    setValues((prev) => {
      const exists = prev.some((d) => d.isSame(normalized, "day"));
      return exists
        ? prev.filter((d) => !d.isSame(normalized, "day"))
        : [...prev, normalized];
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={null}
        onChange={(newValue) => {
          if (newValue) {
            toggleDate(newValue);
          }
        }}
        slots={{
          day: (props: PickersDayProps) => {
            const { day, ...other } = props;

            return (
              <CustomPickersDay
                {...other}
                day={day}
                selected={isSelected(day)}
                disableMargin
              />
            );
          },
        }}
        slotProps={{
          actionBar: {
            actions: [],
          },
        }}
      />
    </LocalizationProvider>
  );
};
