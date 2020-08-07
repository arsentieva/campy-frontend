import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
