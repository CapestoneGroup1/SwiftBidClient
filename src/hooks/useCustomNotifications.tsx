import { useSnackbar } from "notistack";

const useCustomNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const error = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const warning = (message: string) => {
    enqueueSnackbar(message, { variant: "warning" });
  };

  return { success, error, warning };
};

export default useCustomNotifications;
