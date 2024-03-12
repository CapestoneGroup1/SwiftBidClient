import { CircularProgress, Grid } from "@mui/material";
import React from "react";

export default function Loading(props: { loading: boolean, children: React.ReactNode }) {
  if (props.loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  return <>
    {
        props.children
    }
  </>;
}
