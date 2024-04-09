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
      {isSmallScreen ? (
        <img
          alt="Wave background"
          src={wave}
          style={{
            width: "100%",
            height: isSmallScreen ? "80vh" : "50vh",
            // maxHeight: isSmallScreen ? "80vh" : "50vh", // Set maximum height based on screen size
          }}
        />
      ) : (
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          id="wave"
          style={{
            transform: "rotate(180deg)",
            width: "100%",
          }}
          viewBox="0 0 1440 490"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(0, 153, 255, 1)" offset="80%" />
              <stop stopColor="rgba(255, 255, 255, 1)" offset="85%" />{" "}
            </linearGradient>
          </defs>
          <path
            style={{ transform: "translate(0, 0px)", opacity: 1 }}
            fill="url(#sw-gradient-0)"
            d="M0,147L80,171.5C160,196,320,245,480,253.2C640,261,800,229,960,187.8C1120,147,1280,98,1440,122.5C1600,147,1760,245,1920,245C2080,245,2240,147,2400,138.8C2560,131,2720,212,2880,220.5C3040,229,3200,163,3360,130.7C3520,98,3680,98,3840,147C4000,196,4160,294,4320,343C4480,392,4640,392,4800,367.5C4960,343,5120,294,5280,261.3C5440,229,5600,212,5760,228.7C5920,245,6080,294,6240,318.5C6400,343,6560,343,6720,318.5C6880,294,7040,245,7200,228.7C7360,212,7520,229,7680,269.5C7840,310,8000,376,8160,383.8C8320,392,8480,343,8640,285.8C8800,229,8960,163,9120,114.3C9280,65,9440,33,9600,81.7C9760,131,9920,261,10080,285.8C10240,310,10400,229,10560,163.3C10720,98,10880,49,11040,24.5C11200,0,11360,0,11440,0L11520,0L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"
          />
        </svg>
      )}
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
