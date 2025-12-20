import dayjs from "dayjs";

export const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

/**
 * Create a dynamic list of years
 * This updates every year automatically to include `count` number
 * of years in the past
 */
const count = 25;
const currentYear = dayjs().year();
export const YEARS = Array.from(
  { length: count + 1 },
  (_, i) => currentYear - i
);

export const TIMEZONES = [
  {
    value: "pst",
    label: "Pacific Standard Time",
  },
  {
    value: "mst",
    label: "Mountain Standard Time",
  },
  {
    value: "cst",
    label: "Central Standard Time",
  },
  {
    value: "est",
    label: "Eastern Standard Time",
  },
];

export const TIMEOPTIONS = [
  { value: "00:00", label: "12:00 am" },
  { value: "01:00", label: "1:00 am" },
  { value: "02:00", label: "2:00 am" },
  { value: "03:00", label: "3:00 am" },
  { value: "04:00", label: "4:00 am" },
  { value: "05:00", label: "5:00 am" },
  { value: "06:00", label: "6:00 am" },
  { value: "07:00", label: "7:00 am" },
  { value: "08:00", label: "8:00 am" },
  { value: "09:00", label: "9:00 am" },
  { value: "10:00", label: "10:00 am" },
  { value: "11:00", label: "11:00 am" },
  { value: "12:00", label: "12:00 pm" },
  { value: "13:00", label: "1:00 pm" },
  { value: "14:00", label: "2:00 pm" },
  { value: "15:00", label: "3:00 pm" },
  { value: "16:00", label: "4:00 pm" },
  { value: "17:00", label: "5:00 pm" },
  { value: "18:00", label: "6:00 pm" },
  { value: "19:00", label: "7:00 pm" },
  { value: "20:00", label: "8:00 pm" },
  { value: "21:00", label: "9:00 pm" },
  { value: "22:00", label: "10:00 pm" },
  { value: "23:00", label: "11:00 pm" },
];

export const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
