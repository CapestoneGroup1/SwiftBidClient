import React from "react";
import { useAppContext } from "./AppWrapper";

type RoleBasedAccessProps = {
  element: React.ReactNode;
};

export default function RoleBasedAccess(props: RoleBasedAccessProps) {
  const { isUserLoggedIN, user } = useAppContext();

  if (!isUserLoggedIN || user?.role?.toLowerCase() !== "admin") {
    return <></>;
  } else {
    return <>{props.element}</>;
  }
}
