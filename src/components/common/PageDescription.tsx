import { Grid, Hidden, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function PageDescription(props: {
  title?: string;
  caption?: string;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            variant="h6"
            style={{ color: "white", fontSize: isSmallScreen ? '1rem' : "2.25rem" }}
          >
            {props.title}
          </Typography>
          {props.caption && (
            <>
              <Typography
                variant="caption"
                style={{
                  color: "white",
                  fontSize: "0.8rem",
                  width: "70%",
                  textAlign: "center",
                }}
              >
                {props.caption}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
