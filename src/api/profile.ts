import { useEffect } from "react";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useCustomNotifications from "../hooks/useCustomNotifications";
import { env } from "../utils/env";
import { Category, ProfileUpdateData, User } from "../utils/types";



export const useUpdateProfile = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<ProfileUpdateData, User>(env.api.updateProfile);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data.id) {
      success("Profile Updated Success");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Update profile");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};
