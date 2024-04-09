import { Alert } from "@mui/material";
import React from "react";
import { PRODUCT_STATUS } from "../../utils/types";

type ProductStatusProps = {
  status: PRODUCT_STATUS;
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
  } else if (status === "SOLD") {
    return (
      <Alert variant="outlined" severity="success">
        SOLD
      </Alert>
    );
  }else if (status === "EXPIRED") {
    return (
      <Alert variant="outlined" severity="info">
        EXPIRED
      </Alert>
    );
  } else {
    return <></>;
  }
}
