import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  return (
    <>
      <Box
        sx={{
          my: 10,
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", my: 3 }}
          variant="h4"
        >
          Frequently asked questions
        </Typography>

        <Box sx={{ maxWidth: "800px", marginX: "auto" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Who can access this platform?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Only authorized users assigned by the Waqf-e-Nau Department.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                What is the purpose of these classes?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                While an in-person Waqf-e-Nau class organized by your Local
                Secretary or Local Muavina only cover certain aspects of Taleem
                & Tarbiyyat of Waqifeen-e-Nau, these Online classes focus on
                preparing you for the syllabus.
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                The majority of the classes are taught by Murabiyyan.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Is registration required?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Yes, registration is required. Every person (parents and
                students) who wants to access the platform, need to create their
                account and complete their registration process. Only once the
                registration is completed, will the students be enrolled in
                their classes.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Who should attend the Class?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                All boys between the ages of 4 to 21 should attend the classes.
                These classes cover the Syllabus & are taught mainly by
                Murabiyyan-e-Silsila.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Is this platform only for Waqf-e-Nau members?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Yes, this system is designed specifically for Waqf-e-Nau
                educational programs.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                How are classes assigned?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Classes are assigned by the administrators.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Can parents view their child’s progress?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                Parents may access their kids’ accounts and join classes.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                Is this an official department platform?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                This platform operates under the guidance and objectives of the
                Waqf-e-Nau Department.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6-content"
              id="panel6-header"
            >
              <Typography component="span" variant="body1" fontWeight="bold">
                What devices are supported?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                The platform can be accessed on computers, tablets, and mobile
                devices with an internet connection.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default Faq;
