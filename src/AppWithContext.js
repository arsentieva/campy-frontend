import React, { useState } from "react";
import App from "./App";
import { CampyContext } from "./CampyContext";
import url from './config';

export const AppWithContext = () => {
  const accessToken = localStorage.getItem("access_token");
  const [authToken, setAuthToken] = useState(accessToken);
  const [currentUser, setCurrentUser] = useState();
  const [locations, setLocations] = useState();
  const [location, setLocation] = useState();
  
  const login = (token) => {
    window.localStorage.setItem("campy_token", token);
    setAuthToken(token);
  };
  const logOut = () => {
    window.localStorage.clear();
    setAuthToken(null);
  };

  const getUser = async (userID) => {
  try {
    const response = await fetch(`${url}/user/${userID}`);
      if (!response.ok) {
        throw response;
      } 
  
    const { user } = await response.json();
    setCurrentUser(user);
    
    } catch (error) {
      if (error) {
      console.log(error.status)
      }

    };
  };

  const loadLocations = async () => {
    try {
    const res = await fetch(`${url}/locations`);
    if(!res.ok){
      throw res;
    }
    const allLocations = await res.json();
    setLocations(allLocations.locations);
   } catch (error) {
     console.log(error);
   }
  }

  const loadLocation = async (id) => {
    try {
    const res = await fetch(`${url}/locations/${id}`);
    if(!res.ok){
      throw res;
    }
    const selectedActivity = await res.json();
    setLocation(selectedActivity.location);
   } catch (error) {
     console.log(error);
   }
  }

  
  return (
    <CampyContext.Provider value={{ authToken, login, logOut, currentUser, getUser, loadLocations, locations, location, loadLocation }}>
      <App />
    </CampyContext.Provider>
  );
};
