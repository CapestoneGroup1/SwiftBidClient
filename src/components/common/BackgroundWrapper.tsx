import React from "react";
import wave from "../../assets/images/wave.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function BackgroundWrapper(props: any) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        alt="Wave background"
        src={wave}
        style={{
          width: "100%",
          height: isSmallScreen ? "80vh" : "50vh"
          // maxHeight: isSmallScreen ? "80vh" : "50vh", // Set maximum height based on screen size
        }}
      />
      <div
        style={{
          position: "absolute",
          top: props.top || 10,
          height: "80vh",
          width: "100%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}