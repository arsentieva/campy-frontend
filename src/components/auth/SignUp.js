import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { CampyContext } from "../../CampyContext";
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";
import url from '../../config';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const { login, authToken, getUser} = useContext(CampyContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (authToken) {
    return <Redirect to="/" />;
  }

  const handleSignup = async () => {
    let values = {  
      firstName,
      lastName,
      email,
      password,
      phoneNumber};

    try{
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw res;
      }
      const { access_token, user_id } = await res.json();
      login(access_token);
      getUser(user_id);

    } catch (error) {
      console.log(error);
    }
};

  return (
    <div>
      <Grid container style={{ minHeight: "98vh" }}>
        <Grid item xs={12} sm={6}>
          <img src={camperPic} alt="camper under stars" style={{ width: "100%", height: "100%", objectFit: "cover", margin: 0, padding: 0 }}/>
        </Grid>
        <Grid className={classes.formContainer} container item xs={12} sm={6} alignItems="center" justify="space-between" direction="column" style={{ padding: 10 }}>
          <div />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid container justify="center">
              <img src={logo} alt="campy logo" width={300} />
            </Grid>
            <TextField label="First Name" margin="normal" onChange={(e) => setFirstName(e.target.value)}/>
            <TextField label="Last Name" margin="normal" onChange={(e) => setLastName(e.target.value)}/>
            <TextField type="email" label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)}/>
            <TextField type="phone" label="Phone Number" margin="normal" onChange={(e) => setPhoneNumber(e.target.value)}/>
            <TextField type="password" label="Password" margin="normal" onChange={(e) => setPassword(e.target.value)}/>
            <div style={{ height: 20 }} />
            <div style={{ height: 20 }} />
            <Button color="primary" onClick={handleSignup} variant="contained" width="100%">Submit</Button>
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
