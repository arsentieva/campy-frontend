import React, { useState } from "react";
import App from "./App";
import { CampyContext } from "./context/CampyContext";
import Axios from "axios";
import url from './config';

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("access_token");
  const [authToken, setAuthToken] = useState(accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);
  const [currentUser, setCurrentUser] = useState();
  
  const authAxios = Axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const login = (token) => {
    window.localStorage.setItem("access_token", token);
    // console.log(token)
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  const getUser = async (userID) => {
    if (!userID) {
      return {};
    }
    const User = await authAxios.get(`/user/${userID}`, "User").then((response) => {
      const { user } = response.data;
      setCurrentUser(user);
    });

    return User;
  };

  
  return (
    <CampyContext.Provider value={{ authToken, isLoggedIn, login, logOut, currentUser, getUser }}>
      <App />
    </CampyContext.Provider>
  );
};
