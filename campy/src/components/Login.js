import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import camperPic from "../assets/camperUnderStars.jpg";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#38A3A5",
  },
}));

export const Login = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container style={{ minHeight: "100vh", }}>
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
          item
          xs={12}
          sm={6}
          alignItems="center"
          justify="space-between"
          direction="column"
          style={{ padding: 10 }}
        >
          <div />
          <div style={{ display: "flex", flexDirection: "column", }}>
            <Grid container justify="center">
              <img src={logo} alt="campy logo" width={300} />
            </Grid>
            <TextField
              label="Email"
              margin="normal"
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
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ height: 20 }} />
            <Button color="primary" variant="contained" width='100%'>
              Login
            </Button>
            <div style={{ height: 20}} />
            <Typography >
              Not registered? <a href="/sign-up">Sign Up Here!</a>
            </Typography>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
};
