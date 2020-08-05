import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import camperPic from "../../assets/camperUnderStars.jpg";
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#38A3A5",
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const [data, setData] = useState("");
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
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
            <TextField label="First Name" margin="normal" />
            <TextField label="Last Name" margin="normal" />

            <TextField type='email' label="Email" margin="normal" />
            <TextField type='password' label="Password" margin="normal" />

            <TextField type='password' label="Confirm Password" margin="normal" />
            
            <FormControl className={classes.formControl}>
              <InputLabel id="methodOfCamping">
                Primary Method of Camping
              </InputLabel>
              <Select
                labelId="methodOfCamping"
                value={data.method}
                onChange={handleChange}
              >
                <MenuItem value="RV">RV</MenuItem>
                <MenuItem value="camper">Camper</MenuItem>
                <MenuItem value="carWithTent">Car with Tent</MenuItem>
              </Select>
            </FormControl>
            <div style={{ height: 20 }} />
            <InputLabel htmlFor="imageUpoad">Profile Picture</InputLabel>
            <Button id="imageUpload" variant="contained" color="primary">
              <input type="file" />
            </Button>
            <div style={{ height: 20 }} />
            <Button color="primary" variant="contained" width="100%">
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
