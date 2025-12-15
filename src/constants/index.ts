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
