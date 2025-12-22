import { Box, CircularProgress } from "@mui/material";

export const Loading = ({ height = "100vh" }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ width: "100%", height: "100%" }} />
      </Box>
    </>
  );
};
