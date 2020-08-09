import React, { useState, useEffect } from "react";
import App from "./App";
import { CampyContext } from "./context/CampyContext";
import Axios from "axios";

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");
  const [authToken, setAuthToken] = useState(accessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(!accessToken);
  const [currentUser, setCurrentUser] = useState();
  const [userID, setUserID] = useState(user_id);

  // if (accessToken) {
  //   setAuthToken(accessToken);
  // }
  // console.log('+++')

  const apiUrl = "https://campy-backend.herokuapp.com";

  const authAxios = Axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const login = (token) => {
    window.localStorage.setItem("access_token", token);
    console.log(token)
    setAuthToken(token);
    setIsLoggedIn(true);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  const getUser = async (userID) => {
    // console.log(userID);
    // console.log(accessToken);
    if (!userID) {
      return {};
    }
    const User = await authAxios.get(`/users/${userID}`, "User").then((response) => {
      // console.log(response);
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
        apiUrl,
      }}
    >
      <App accessToken={accessToken} />
    </CampyContext.Provider>
  );
};
