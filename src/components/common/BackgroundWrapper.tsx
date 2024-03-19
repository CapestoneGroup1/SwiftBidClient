import React from "react";
import wave from "../../assets/images/wave.png";

export default function BackgroundWrapper(props: any) {
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
          height: props.height || 'auto'
        }}
      />
      <div
        style={{
          position: "absolute",
          top: props.top || 10,
          height: "80vh",
          width: '100%'
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
