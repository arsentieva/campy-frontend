import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { authToken } = useContext(CampyContext); 
  const accessToken = localStorage.getItem("access_token");
  
//  TODO if you can use authToken instead of accessToken
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
