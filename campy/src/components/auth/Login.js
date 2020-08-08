import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ErrorNotice } from "../ErrorNotice";
import { DemoUser } from "./DemoUser";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const Login = () => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const postLogin = () => {
    Axios.post("https://campy-backend.herokuapp.com/auth/login", {
      email,
      password,
    })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err) && setIsError(err);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src={camperPic}
            alt="camper under stars"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              margin: 0,
              padding: 0,
            }}
          />
        </Grid>
        <Grid
          className={classes.formContainer}
          container
          component="form"
          item
          xs={12}
          sm={6}
          alignItems="center"
          justify="space-between"
          direction="column"
          style={{ padding: 10 }}
        >
          <div />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid container justify="center">
              <img src={logo} alt="campy logo" width={300} />
            </Grid>
            {isError && (
              <ErrorNotice
                message={isError}
                clearError={() => setIsError(undefined)}
              />
            )}

            <TextField
              label="Email"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              margin="normal"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container item direction='column' justify='center' alignContent='center'>
              
              <div style={{ height: 20 }} />
            <Button
              color="primary"
              variant="contained"
              width="100%"
              onClick={postLogin}
            >
              Login
            </Button>
            <DemoUser />
            <div style={{ height: 20 }} />

            </Grid>
            <div style={{ height: 20 }} />
            <Typography>
              Not registered? <a href="/sign-up">Sign Up Here!</a>
            </Typography>
          </div>
          <div />
        </Grid>
      </Grid>
    </>
  );
};
