import { Alert } from "@mui/material";
import React from "react";

type ProductStatusProps = {
  status: "APPROVED" | "REJECTED" | "PENDING";
};

export default function ProductStatus({ status }: ProductStatusProps) {
  if (status === "APPROVED") {
    return (
      <Alert variant="outlined" severity="success">
        Approved for Bidding
      </Alert>
    );
  } else if (status === "PENDING") {
    return (
      <Alert variant="outlined" severity="warning">
        Awaiting Approval
      </Alert>
    );
  } else if (status === "REJECTED") {
    return (
      <Alert variant="outlined" severity="error">
        Rejected
      </Alert>
    );
  } else {
    return <></>;
  }
}
