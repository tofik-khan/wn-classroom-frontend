import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
    <Box
      sx={{
	    width: "100%",
		height: "100px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
        backgroundColor: '#fcf0f5', //from rgb color picker
        color:'#6A0136', //from colors.ts - primary main
      }}
    >
     
	<Typography variant = "caption">
	  © waqfenau.us-2023 | All Rights Reserved
	</Typography>
	
    </Box>
	</>
  );
};

export default Footer;


