import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
} from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#38A3A5",
  },
}));

export const DemoUser = () => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
 
  const { setAuthTokens } = useAuth();

  const postLogin = () => {
    Axios.post("http://localhost:5000/auth/login", {
      email: 'demo@mail.com',
      password: 'password',
    })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } 
      })
      .catch((err) => {
        console.log(err)
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div style={{ height: 20 }} />
      <Button
        color="primary"
        variant="contained"
        width="100%"
        onClick={postLogin}
      >
        <PermIdentity />
        Login As Demo User
      </Button>

      <div />
    </div>
  );
};
