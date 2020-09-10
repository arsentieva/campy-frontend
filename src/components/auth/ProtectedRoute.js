import React, { useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { CampyContext} from "../../CampyContext"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useContext(CampyContext); 

  return (
    <Route
      {...rest}
      render={props =>
        authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
