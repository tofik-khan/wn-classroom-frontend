import { Box, Typography, Button } from "@mui/material";

const Contact = () => {
  return (
    <>
      <Box
        sx={() => ({
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          my: 10,
        })}
      >
        <Typography variant="h5" fontWeight="bold">
          Still have questions?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reach out for any concerns.
        </Typography>
        <Button variant="contained">Contact Us</Button>
      </Box>
    </>
  );
};

export default Contact;
