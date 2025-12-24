import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router";
import { AdminSideBar } from "../Nav/AdminSideBar";
import { Box } from "@mui/material";
import { Loading } from "../Loading";
import { useAppDispatch } from "@/hooks";
import { setCurrentUser } from "@/reducers/user";
import { useUserQuery } from "@/queries/users";
import { useEffect } from "react";

export const ProtectedLayout = withAuthenticationRequired(
  () => {
    const { isLoading: isLoadingAuth, logout } = useAuth0();
    const { isLoading: isLoadingUser, data: currentUser } = useUserQuery();
    const navigate = useNavigate();

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
      </>
    );
  },
  {
    onRedirecting: () => <Loading />,
    returnTo: window.location.pathname,
  }
);
