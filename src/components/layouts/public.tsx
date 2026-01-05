import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import AppBar from "@/components/Nav/AppBar";
import Footer from "@/components/Nav/Footer";
import { Loading } from "../Loading";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeSnackbar } from "@/reducers/snackbar";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

export const PublicLayout = () => {
  const { isLoading } = useAuth0();
  const { open, type, title, content } = useAppSelector(
    (state) => state.snackbar
  );
  const dispatch = useAppDispatch();

  if (isLoading) return <Loading />;

  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={type === "error" ? 30000 : 5000}
        onClose={() => dispatch(closeSnackbar())}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          <AlertTitle>{title}</AlertTitle>
          {content}
        </Alert>
      </Snackbar>
    </>
  );
};
