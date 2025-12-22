import dayjs, { Dayjs } from "dayjs";

export const getNextSession = (schedule: Dayjs[] | undefined) => {
  const now = dayjs();

  const nextShift = schedule
    ?.map((date) => dayjs(date))
    .filter((date) => date.isAfter(now))
    .sort((a, b) => a.valueOf() - b.valueOf())[0];

  return nextShift;
};
