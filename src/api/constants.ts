export const API_BASE =
  import.meta.env.VITE_ENV === "DEV"
    ? "http://localhost:3001"
    : "https://wn-classroom-backend.vercel.app";
