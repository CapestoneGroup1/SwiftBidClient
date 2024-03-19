import React from "react";
import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";

export default function AuthPagesWrapper(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundWrapper>
        <Grid container justifyContent="center">
          <Grid item xs={10} md={6} lg={4}>
            <Paper elevation={10} style={{ borderRadius: "20px", padding: 10 }}>
              <Typography variant="h6" align="center">
                {props.title}
              </Typography>
              <br />
              <Grid container justifyContent="center">
                <Grid item xs={11} md={10}>
                  {props.children}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </BackgroundWrapper>
    </>
  );
}
