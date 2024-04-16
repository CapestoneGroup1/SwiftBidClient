import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Navigation from "./Navigation";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import UserProfileIcon from "./UserProfileIcon";
import logo from "../assets/images/logo.png";
import NavLogo from "./common/NavLogo";
import TopNavBar from "./common/TopNavBar";
import { useNavigate } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Base(props: { children: React.ReactNode }) {
  const navigate = useNavigate()
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
        <Toolbar style={{ backgroundColor: "#0099ff" }}>
          <NavLogo />
          <Typography
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate("/")}
          >
            SwiftBid
          </Typography>
          <Hidden smDown>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <TopNavBar />
            </Box>
          </Hidden>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer("right", true)}
            style={{marginLeft: '10px'}}
          >
            <UserProfileIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Grid container> */}
      {/* <Grid item xs={12} style={{width: '100%'}}> */}
      {props.children}
      {/* </Grid> */}
      {/* </Grid> */}
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
