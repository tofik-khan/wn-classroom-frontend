import dayjs, { Dayjs } from "dayjs";

export const getNextSession = (schedule: Dayjs[] | undefined) => {
  const now = dayjs().tz("America/New_York").startOf("day");

  const nextShift = schedule
    ?.map((date) => dayjs(date).tz("America/New_York"))
    .filter((date) => date.isAfter(now))
    .sort((a, b) => a.valueOf() - b.valueOf())[0];

  return nextShift;
};

export const months = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).format("MMMM").toLowerCase(),
);
