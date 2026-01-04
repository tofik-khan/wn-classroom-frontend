import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router";
import { AdminSideBar } from "../Nav/AdminSideBar";
import { Alert, AlertTitle, Box, Snackbar } from "@mui/material";
import { Loading } from "../Loading";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentUser } from "@/reducers/user";
import { useUserQuery } from "@/queries/users";
import { useEffect } from "react";
import { closeSnackbar } from "@/reducers/snackbar";

export const ProtectedLayout = withAuthenticationRequired(
  () => {
    const { isLoading: isLoadingAuth, logout } = useAuth0();
    const { isLoading: isLoadingUser, data: currentUser } = useUserQuery();
    const navigate = useNavigate();
    const { open, type, title, content } = useAppSelector(
      (state) => state.snackbar
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
      /**
       * Current user is not registered, send them to register page
       */
      if (currentUser && currentUser.role === "unregistered")
        navigate("/protected/register");

      /**
       * Update reducer value if currentUser exists
       */
      if (!!currentUser) {
        dispatch(setCurrentUser(currentUser));
      }
    }, [currentUser]);

    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: `${window.location.protocol}//${window.location.host}/403`,
        },
      });
    };

    if (isLoadingAuth || isLoadingUser) return <Loading />;

    /**
     * Kitchen Sink for login issues and protection against unwanted signin
     */
    if (!currentUser) {
      handleLogout();
      return <></>;
    }

    return (
      <>
        <AdminSideBar />
        <Box
          component={"main"}
          sx={{
            ml: { md: "250px" },
            px: "20px",
            pt: "40px",
          }}
        >
          <Outlet />
        </Box>
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
  },
  {
    onRedirecting: () => <Loading />,
    returnTo: window.location.pathname,
  }
);
