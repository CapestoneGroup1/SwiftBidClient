import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useAppContext } from "./AppWrapper";
import { useNavigate } from "react-router-dom";
import { env } from "../utils/env";

export default function Navigation() {
  const { isUserLoggedIN, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText primary={"HOME"} />
          </ListItemButton>
        </ListItem>
        {!isUserLoggedIN && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.login)}>
                <ListItemText primary={"LOGIN"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.signup)}>
                <ListItemText primary={"SIGNUP"} />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isUserLoggedIN && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.home)}>
                <ListItemText primary={"PROFILE"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate(env.routes.home)}>
              <ListItemButton>
                <ListItemText primary={"MY PRODUCTS"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate(env.routes.home)}>
              <ListItemButton>
                <ListItemText primary={"ADD PRODUCT"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        
        {isUserLoggedIN && user.role?.toLowerCase() !== "admin" && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.home)}>
                <ListItemText primary={"WINNINGS"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.home)}>
                <ListItemText primary={"MY BIDS"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {isUserLoggedIN && user.role?.toLowerCase() === "admin" && (
          <>
            {/* Admin Related Routed */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.admin)}>
                <ListItemText primary={"PENDING APPROVALS"} />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isUserLoggedIN && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.logout)}>
                <ListItemText primary={"LOGOUT"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </>
  );
}
