import { Button, CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  type?: "primary" | "error" | "success" | "warning";
  loading?: boolean;
  onClick: () => void;
  disabled?: boolean
};

export default function CustomButton(props: Props) {
  return (
    <>
      <Button
        variant="contained"
        color={props.type}
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
      >
        {props.loading ? <CircularProgress /> : props.name}
      </Button>
    </>
  );
}
