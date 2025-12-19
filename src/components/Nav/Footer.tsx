import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
    <Box
    sx={(theme) => ({
      width: "100%",
		  height: "100px",
		  display: "flex",
		  justifyContent: "center",
		  alignItems: "center",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    })}
    >
     
	<Typography variant = "caption">
	  &copy; waqfenau.us - {new Date().getFullYear()} | All Rights Reserved
	</Typography>
	
    </Box>
	</>
  );
};

export default Footer;


