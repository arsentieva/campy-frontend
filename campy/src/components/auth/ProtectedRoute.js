import React from "react";
import { Route, Redirect } from "react-router-dom";
// import {CampyContext} from '../../context/CampyContext'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { authToken } = useContext(CampyContext);
  const accessToken = localStorage.getItem("access_token");
  
  // console.log(accessToken, '.........')
  return (
    <Route
      {...rest}
      render={props =>
        accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
