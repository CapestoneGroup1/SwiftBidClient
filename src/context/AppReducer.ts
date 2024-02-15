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
      localStorage.setItem("token", token);
      return { ...state, isUserLoggedIN: true, token };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, isUserLoggedIN: false, user: {} as User };
    default:
      return state;
  }
};
