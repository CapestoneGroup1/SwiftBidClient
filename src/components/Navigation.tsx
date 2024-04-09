import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppContext } from "./AppWrapper";
import { useNavigate } from "react-router-dom";
import { env } from "../utils/env";

export default function Navigation() {
  const { isUserLoggedIN, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      {isUserLoggedIN && user && (
        <Grid container direction="column" style={{ padding: 10 }} spacing={1}>
          <Grid item>
            <Avatar
              style={{
                fontSize: "2rem",
              }}
            >
              {user?.username?.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </Grid>
      )}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(env.routes.home)}>
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
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.userprofile)}>
                <ListItemText primary={"PROFILE"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => navigate(env.routes.myproducts)}
            >
              <ListItemButton>
                <ListItemText primary={"MY PRODUCTS"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => navigate(env.routes.addproduct)}
            >
              <ListItemButton>
                <ListItemText primary={"ADD PRODUCT"} />
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isUserLoggedIN && user.role?.toLowerCase() !== "admin" && (
          <>
            <ListItem
              disablePadding
              onClick={() => navigate(env.routes.winnings)}
            >
              <ListItemButton>
                <ListItemText primary={"WINNINGS"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => navigate(env.routes.wishlist)}
            >
              <ListItemButton>
                <ListItemText primary={"MY BIDS"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.savedcards)}>
                <ListItemText primary={"PAYMENT CARDS"} />
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
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(env.routes.categories)}>
                <ListItemText primary={"ADD/EDIT CATEGORIES"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(env.routes.decalrewinners)}
              >
                <ListItemText primary={"DECLARE WINNERS"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(env.routes.winners)}
              >
                <ListItemText primary={"WINNERS"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate(env.routes.queries)}
              >
                <ListItemText primary={"QUERIES"} />
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
