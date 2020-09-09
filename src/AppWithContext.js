import React, { useState } from "react";
import App from "./App";
import { CampyContext } from "./CampyContext";
import url from './config';
import { Report } from "@material-ui/icons";

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("access_token");
  const [authToken, setAuthToken] = useState(accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);
  const [currentUser, setCurrentUser] = useState();
  
  const login = (token) => {
    window.localStorage.setItem("campy_token", token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  const getUser = async (userID) => {
  try {
    const response = await fetch(`${url}/user/${userID}`);
      if (!response.ok) {
        throw response;
      } 
    const { user } = response.json();
    setCurrentUser(user);
    } catch (error) {
      if (error) {
      console.log(error.status)
      }

    };
  };

  
  return (
    <CampyContext.Provider value={{ authToken, isLoggedIn, login, logOut, currentUser, getUser }}>
      <App />
    </CampyContext.Provider>
  );
};
