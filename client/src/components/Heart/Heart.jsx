import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuth0Check from "../../hooks/useAuth0Check";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { checkFavourites, updateFavourites } from "../../utils/common";
import { toFav } from "../../utils/api";

const Heart = ({ id }) => {
  // const residecyId = id.toString();
  // console.log(typeof residecyId);
  const [heartColor, setHeartColor] = useState("lightgrey");
  const { validateLogin } = useAuth0Check();
  const { user } = useAuth0();
  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    // console.log(id);
    // console.log(typeof id);
    console.log(favourites);
    // console.log(favourites.includes(10));
    setHeartColor(() => checkFavourites(id, favourites));
    // console.log("werrr");
    // console.log(heartColor);
  }, [favourites]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });
  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "lightgrey" : "#fa3e5f"));
    }
  };

  // console.log(favourites);

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
