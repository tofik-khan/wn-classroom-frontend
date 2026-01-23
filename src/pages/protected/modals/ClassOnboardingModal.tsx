import { useAppSelector } from "@/hooks";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Stepper,
  DialogActions,
  Button,
  Step,
  StepLabel,
} from "@mui/material";
import { useState } from "react";

const parentSteps = [
  "Add Students",
  "Enroll in Classes",
  "View Classes",
  "Join Classes",
];

const studentSteps = ["Enroll in Classes", "View Classes", "Join Classes"];

export const ClassOnboardingModal = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const { currentUser } = useAppSelector((state) => state.user);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handelBackStep = () => {
    setStep((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const isLastStep =
    currentUser.role === "parent"
      ? step >= parentSteps.length
      : step >= studentSteps.length;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Are you all set for the first class?</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          pl: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Stepper activeStep={step}>
          {currentUser.role === "student"
            ? studentSteps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))
            : parentSteps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
        </Stepper>
        {currentUser.role === "parent" ? (
          <ParentContent step={step} />
        ) : (
          <StudentContent step={step} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handelBackStep}>Back</Button>
        {isLastStep ? (
          <Button onClick={onClose}>Close</Button>
        ) : (
          <Button onClick={handleNextStep}>Next</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const ParentContent = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <>
          <Typography>
            As a parent, you can add all your Waqf-e-Nau Boys that will attend
            the classes right from your dashboard.
          </Typography>
          <Typography>
            To add a student, click on the "Create Student" button on your
            dashboard.
          </Typography>
          <img
            src="/assets/onboarding/create-student.png"
            width="30%"
            style={{ margin: "auto", minWidth: "300px" }}
          />
          <Typography>
            You will then be able to enter the information about the Waqf-e-Nau
            in the form and select the class you wish to enroll them in.
          </Typography>
          <Typography>
            <em>
              Keep in mind that once you add the student, you will not see the
              classes until a member of the admin team verifies the information
              and enrolls the student in the class.
            </em>
          </Typography>
        </>
      );
    case 1:
      return (
        <>
          <Typography>
            Once the students are added to your dashboard, the admin team will
            verify their information and assign them to their respective
            classes.
          </Typography>
          <Typography>
            After the verification is done and the student is enrolled in the
            classroom, you will be able to see all the classes for each of your
            children on your dashboard.
          </Typography>
          <img
            src="/assets/onboarding/class-enrolled.png"
            width="60%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    case 2:
      return (
        <>
          <Typography>
            You can view the contents of the class and view any resources such
            as the syllabus and the learning plans.
          </Typography>
          <Typography>
            You can view the class schedule for the current and next months
          </Typography>
          <img
            src="/assets/onboarding/class-schedule.png"
            width="30%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    case 3:
      return (
        <>
          <Typography>
            On the day of the class, You will need to open the class and wait
            for the teacher to start the session.
          </Typography>
          <img
            src="/assets/onboarding/class-not-started.png"
            width="40%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
          <Typography>
            When the teacher starts the class session, you will see the link to
            join automatically. Once you see the "Join Session" button, you can
            click on it and go to the virtual classroom
          </Typography>
          <img
            src="/assets/onboarding/class-started.png"
            width="40%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    default:
      return (
        <>
          <Typography>
            That's it! You're all set for the first day of classes
          </Typography>
          <Typography>
            We use Google Meets to hold these classes, having a Google Account
            is not required but if you are using a phone or a tablet, having the
            Google Meets App makes the experience very smooth.
          </Typography>
          <Typography>
            If you have any issues, please reach out to the Admin Team using the
            "?" button on the bottom right
          </Typography>
        </>
      );
  }
};

const StudentContent = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <>
          <Typography>
            Now that your registration is complete, the admin team will verify
            your information
          </Typography>
          <Typography>
            After the verification is done and you are enrolled in the
            classroom, you will be able to see all the classes on your
            dashboard.
          </Typography>
          <img
            src="/assets/onboarding/class-enrolled.png"
            width="60%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    case 1:
      return (
        <>
          <Typography>
            You can view the contents of the class and view any resources such
            as the syllabus and the learning plans.
          </Typography>
          <Typography>
            You can view the class schedule for the current and next months
          </Typography>
          <img
            src="/assets/onboarding/class-schedule.png"
            width="30%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    case 2:
      return (
        <>
          <Typography>
            On the day of the class, You will need to open the class and wait
            for the teacher to start the session.
          </Typography>
          <img
            src="/assets/onboarding/class-not-started.png"
            width="40%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
          <Typography>
            When the teacher starts the class session, you will see the link to
            join automatically. Once you see the "Join Session" button, you can
            click on it and go to the virtual classroom
          </Typography>
          <img
            src="/assets/onboarding/class-started.png"
            width="40%"
            style={{
              margin: "auto",
              minWidth: "300px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
        </>
      );
    default:
      return (
        <>
          <Typography>
            That's it! You're all set for the first day of classes
          </Typography>
          <Typography>
            If you have any issues, please reach out to the Admin Team using the
            "?" button on the bottom right
          </Typography>
        </>
      );
  }
};
