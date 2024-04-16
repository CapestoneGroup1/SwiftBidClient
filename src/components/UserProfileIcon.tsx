import React from "react";
import { useAppContext } from "./AppWrapper";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function UserProfileIcon() {
  const { isUserLoggedIN, user } = useAppContext();

  if (isUserLoggedIN && user?.id) {
    return <Avatar style={{color: 'white'}}>{user?.username?.charAt(0)}</Avatar>;
  }  else if (localStorage.getItem("token")) {
    return <></>;
  } else {
    return <MenuIcon style={{color: 'white'}}/>;
  } 
}
