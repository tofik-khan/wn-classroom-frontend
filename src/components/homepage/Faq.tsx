import {Box, Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  return (
	<>
	<Box 
	sx={(theme) => ({display: "flex", justifyContent: "center", alignItems: "center", mt: 3, mb: 3,})}>
		<Typography variant="h4" fontWeight="bold">Frequently asked questions</Typography>
	</Box>

	<Box sx={{ maxWidth: "800px", marginX: "auto" }}>
	<Accordion>
		<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
			<Typography component="span" variant="body1" fontWeight="bold">Who can access this platform?</Typography>
		</AccordionSummary>
		<AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				Only authorized users assigned by the Waqf-e-Nau Department.
			</Typography>
		</AccordionDetails>
	</Accordion>
	  
	<Accordion>
		<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
			<Typography component="span" variant="body1" fontWeight="bold">Is this platform only for Waqf-e-Nau members?</Typography>
        </AccordionSummary>
        <AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				Yes, this system is designed specifically for Waqf-e-Nau educational programs.
			</Typography>	
        </AccordionDetails>
	</Accordion>
	
	<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
			<Typography component="span" variant="body1" fontWeight="bold">How are classes assigned?</Typography>
        </AccordionSummary>
        <AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				Classes are assigned by the administrators.
			</Typography>
		</AccordionDetails>
	</Accordion>
	
	<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4-content" id="panel4-header">
			<Typography component="span" variant="body1" fontWeight="bold">Can parents view their child’s progress?</Typography>
        </AccordionSummary>
        <AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				Parents may access their kids’ accounts and join classes.
			</Typography>
		</AccordionDetails>
	</Accordion>
	
	<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5-content" id="panel5-header">
			<Typography component="span" variant="body1" fontWeight="bold">Is this an official department platform?</Typography>
        </AccordionSummary>
        <AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				This platform operates under the guidance and objectives of the Waqf-e-Nau Department.
			</Typography>
		</AccordionDetails>
	</Accordion>
	
	<Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6-content" id="panel6-header">
			<Typography component="span" variant="body1" fontWeight="bold">What devices are supported?</Typography>
        </AccordionSummary>
        <AccordionDetails>
			<Typography variant="body2" color="text.secondary">
				The platform can be accessed on computers, tablets, and mobile devices with an internet connection.       
			</Typography>
		</AccordionDetails>
	</Accordion>
	</Box>
    </>
  );
};

export default Faq;


