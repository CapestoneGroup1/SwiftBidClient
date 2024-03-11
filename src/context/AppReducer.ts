import { AppContextState, AppDispatchAction, User } from "../utils/types";

export const appReducerFunction = (
  state: AppContextState,
  action: AppDispatchAction
): AppContextState => {
  switch (action.type) {
    case "LOGIN":
      const {
        payload: { token = "" },
      } = action;
      return { ...state, isUserLoggedIN: true, token };
    case "PROFILE":
      const {
        payload: { user = {} as User },
      } = action;
      return { ...state, user };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isUserLoggedIN: false, user: {} as User };
    default:
      return state;
  }
};
