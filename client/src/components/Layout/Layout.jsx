import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  // console.log(user?.email);

  // const { mutate } = useMutation({
  //   mutationKey: [user?.email],
  //   mutationFn: () => createUser(user?.email),
  // });
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://dev-71jqxqecyrmwd3ws.us.auth0.com/api/v2/",
          scope: "openid profile email",
        },
      });
      console.log(res);
      localStorage.setItem("access_token", res);
      // console.log(localStorage);
      setUserDetails((prev) => ({ ...prev, token: res }));
      // return res;
      mutate(res);
      // console.log(userDetails?.token);
    };

    isAuthenticated && getTokenAndRegister();
    // isAuthenticated && mutate();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
