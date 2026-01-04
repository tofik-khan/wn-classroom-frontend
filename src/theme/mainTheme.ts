import { createTheme } from "@mui/material";
import { colors } from "@/lib/colors";

export const theme = createTheme({
  palette: colors,
  typography: {
    h2: {
      fontFamily: "Fraunces,Georgia,Times,serif",
      fontWeight: "bold",
      fontSize: "24px",
      marginBottom: "8px",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});
