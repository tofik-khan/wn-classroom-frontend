import { Loading } from "@/components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

export const PageCallback = () => {
  const [search, _] = useSearchParams();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/protected/dashboard",
      },
    });
  };

  if (search.get("error") !== "") {
    return (
      <>
        <Box p={4}>
          <Typography variant="h2">We're sorry!</Typography>
          <Typography>
            There seems to be some error that caused the application to crash
          </Typography>
          <Typography>
            In this situation, we recommend trying to log in again
          </Typography>
          <Button sx={{ my: 2 }} variant="contained" onClick={handleLogin}>
            Log in
          </Button>
          <Box my={10}>
            <Typography variant="subtitle1">For Developers:</Typography>
            <Typography variant="body2" component={"pre"}>
              {search.get("error")}
            </Typography>
            <Typography variant="body2" component={"pre"}>
              {search.get("error_description")}
            </Typography>
            <Typography variant="body2" component={"pre"}>
              {dayjs().format()}
            </Typography>
            <Typography variant="body2" component={"pre"}>
              {window.location.origin}
            </Typography>
          </Box>
        </Box>
      </>
    );
  }
  return <Loading />;
};
