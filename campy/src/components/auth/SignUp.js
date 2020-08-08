import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import Axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ErrorNotice } from "../ErrorNotice";
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const SignUp = () => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setAuthTokens } = useAuth("");
  const login = () => {
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
  const postRegister = () => {
    Axios.post("https://campy-backend.herokuapp.com/auth/signup", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    }).then(({ email, password }) => login({ email, password }));
  };
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Grid container style={{ minHeight: "98vh" }}>
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
        {isError && (
          <ErrorNotice
            message={isError}
            clearError={() => setIsError(undefined)}
          />
        )}
        <Grid
          className={classes.formContainer}
          component="form"
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          justify="space-between"
          direction="column"
          onSubmit={postRegister}
          style={{ padding: 10 }}
        >
          <div />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid container justify="center">
              <img src={logo} alt="campy logo" width={300} />
            </Grid>
            <TextField
              label="First Name"
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              margin="normal"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              type="email"
              label="Email"
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              type="phone"
              label="Phone Number"
              margin="normal"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={{ height: 20 }} />
            <div style={{ height: 20 }} />
            <Button
              color="primary"
              onClick={postRegister}
              variant="contained"
              width="100%"
            >
              Submit
            </Button>
            <div style={{ height: 20 }} />
            <Typography>
              Already have an account? <a href="/login">Login Here!</a>
            </Typography>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
};
