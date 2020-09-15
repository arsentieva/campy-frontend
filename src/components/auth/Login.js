import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { CampyContext } from "../../CampyContext";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography, InputAdornment} from "@material-ui/core";
import { AccountCircle, LockRounded, PermIdentity } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";
import url from '../../config';
const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#f7fafc",
  },
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },

  }
}));

export const Login = () => {
  const classes = useStyles();

  const { login, authToken, getUser} = useContext(CampyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handleLogin = async (demo=false) => {
    let values = {email, password};
    if(demo) {
      values.email = "demo@email.com";
      values.password = "password";
    }

    try {
      const res = await fetch(`${url}/auth/login`,{
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const error = await res.json()
        setError(error.message)
        throw res;
      }
    
      const { access_token, user_id} = await res.json();
      login(access_token);
      getUser(user_id);

    } catch(error) {
      console.log(error);
    }
  };

  const handleDemoLogin = () => {
    handleLogin(true);
  }

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
            {
              error ? (
                <div className={classes.error}>
                  <Alert variant="outlined" severity="error">
                    {error}
                  </Alert>
                </div>
              ) :
              null
            }
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
              <div style={{ height: 20 }} />
              <Button className={classes.button} color="primary" variant="contained" width="100%" onClick={handleDemoLogin}>
                <PermIdentity />
                Login As Demo User
              </Button>
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
