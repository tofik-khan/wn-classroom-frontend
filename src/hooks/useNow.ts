import dayjs from "dayjs";
import { useEffect, useState } from "react";

// Current time, refreshed on an interval so time-based UI updates on its own
export const useNow = (intervalMs = 60_000) => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
};
