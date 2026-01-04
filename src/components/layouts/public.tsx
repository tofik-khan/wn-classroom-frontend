import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import AppBar from "@/components/Nav/AppBar";
import Footer from "@/components/Nav/Footer";
import { Loading } from "../Loading";

export const PublicLayout = () => {
  const { isLoading } = useAuth0();


  if (isLoading) return <Loading />;

  return (
    <>
      <AppBar />
      <Outlet />
      <Footer />
    </>
  );
};