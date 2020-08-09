import React, { useState, useEffect } from "react";
import App from "./App";
import { CampyContext } from "./context/CampyContext";
import Axios from "axios";
import url from './config';

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("user_id");
  const [authToken, setAuthToken] = useState(accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);
  const [currentUser, setCurrentUser] = useState();
  const [userID, setUserID] = useState(user_id);

  const authAxios = Axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const login = (token) => {
    window.localStorage.setItem("access_token", token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  const getUser = (userID) => {
    console.log(userID);
    console.log(accessToken);
    if (!userID) {
      return {};
    }
    const User = authAxios.get(`/users/${userID}`, "User").then((response) => {
      console.log(response);
      const { user } = response.data;
      setCurrentUser(user);
    });

    return User;
  };

  return (
    <CampyContext.Provider
      value={{
        authToken,
        isLoggedIn,
        login,
        logOut,
        currentUser,
        setCurrentUser,
        userID,
        setUserID,
        getUser,
        authAxios,
        url,
      }}
    >
      <App accessToken={accessToken} />
    </CampyContext.Provider>
  );
};
