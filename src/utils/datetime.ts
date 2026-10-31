import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Classroom } from "@/types/classroom";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

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

export const lateStartByTeacher = ({ scheduled, actual }) => {
  const scheduledStart = dayjs(scheduled).tz("America/New_York");
  const actualStart = dayjs(actual).tz("America/New_York");

  return actualStart.isAfter(scheduledStart.add(2, "minutes"));
};

export const LEAVE_CUTOFF_MESSAGE =
  "Leave can only be requested up to an hour before the class starts.";

/**
 * Earliest scheduled class start (date + start time) that is still in the
 * future. Mirrors `getNextClassStart` on the backend.
 */
export const getNextClassStart = (
  classroom: Pick<Classroom, "schedule" | "start"> | undefined,
  now: Dayjs = dayjs(),
) => {
  if (!classroom?.start?.value) return undefined;

  return classroom.schedule
    ?.map((date) =>
      dayjs.tz(
        `${dayjs(date).tz("America/New_York").format("YYYY-MM-DD")} ${classroom.start.value}`,
        "YYYY-MM-DD HH:mm",
        "America/New_York",
      ),
    )
    .filter((start) => start.isAfter(now))
    .sort((a, b) => a.valueOf() - b.valueOf())[0];
};

export const isLeaveWindowOpen = (
  start: Dayjs | string | undefined,
  now: Dayjs = dayjs(),
) => !!start && now.isBefore(dayjs(start).subtract(1, "hour"));
