import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CampyContext } from "../../context/CampyContext";
import { DemoUser } from "./DemoUser";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography, InputAdornment} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";
import url from '../../config';
const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#f0eace",
  },
}));

export const Login = () => {
  const classes = useStyles();

  const { login, authToken, getUser} = useContext(CampyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${url}/auth/login`,{
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw res;
      }
    
      const { access_token, user_id} = await res.json();
      login(access_token);
      getUser(user_id);
      
    } catch (error){
      console.log(error);
    }
  };

  if (authToken) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img src={camperPic} alt="camper under stars" style={{ width: "100%", height: "100%", objectFit: "cover", margin: 0, padding: 0, }}/>
        </Grid>
        <Grid className={classes.formContainer} container component="form" item xs={12} sm={6} alignItems="center" justify="space-between" direction="column" style={{ padding: 10 }}>
          <div />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Grid container justify="center">
              <img src={logo} alt="campy logo" width={300} />
            </Grid>

            <TextField label="Email" margin="normal" autoComplete='email address' onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField label="Password" margin="normal" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container item direction="column" justify="center" alignContent="center">
              <div style={{ height: 20 }} />
              <Button color="primary" variant="contained" width="100%" onClick={handleLogin}> Login </Button>
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
