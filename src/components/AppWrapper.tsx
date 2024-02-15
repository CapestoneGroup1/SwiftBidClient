import React, { createContext, useContext, useReducer } from "react";
import {
  AppContext,
  AppContextState,
  AppWrapperProps,
  User,
} from "../utils/types";
import { appReducerFunction } from "../context/AppReducer";

const AppContextWrapper = createContext<AppContext>({} as AppContext);

export const useAppContext = () => {
  return useContext(AppContextWrapper);
};

export default function AppWrapper(props: AppWrapperProps) {
  const appContextInitialState: AppContextState = {
    isUserLoggedIN: false,
    user: {} as User,
    token: ''
  };

  const [state, dispatch] = useReducer(
    appReducerFunction,
    appContextInitialState
  );

  return (
    <AppContextWrapper.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AppContextWrapper.Provider>
  );
}
