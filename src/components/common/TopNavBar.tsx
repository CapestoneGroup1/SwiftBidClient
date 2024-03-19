import { Grid } from "@mui/material";
import React from "react";

export default function TopNavBar() {
  return (
    <>
      <Grid container alignItems="center" justifyContent='flex-end' spacing={5}>
        <Grid item>Home</Grid>
        <Grid item>About</Grid>
        <Grid item>Contact</Grid>
      </Grid>
    </>
  );
}
