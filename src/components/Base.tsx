import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Navigation from "./Navigation";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import UserProfileIcon from "./UserProfileIcon";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Base(props: { children: React.ReactNode }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor = "right", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor = "right") => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Navigation />
    </Box>
  );

  return (
    <div>
      <AppBar position="relative">
        <Toolbar style={{backgroundColor: '#3363ff'}}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            SwiftBid
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer("right", true)}
          >
            <UserProfileIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {props.children}
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
