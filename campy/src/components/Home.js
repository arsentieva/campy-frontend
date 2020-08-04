import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  ButtonBase,
  Typography,
  Card,
  CardMedia,
  TextField,
  CardContent,
} from "@material-ui/core";
import woman from "../assets/womanByFirePit.jpg";
import van from "../assets/vanInWoods.jpg";
import truck from "../assets/truckAndCampfire.jpg";
import manBeach from "../assets/manCamperBeach.jpg";
import fire from "../assets/fire.jpg";
import camperField from '../assets/camperInField.jpg'
import sittingOnCamper from '../assets/sittingOnCamper.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    background: `linear-gradient(-70deg, #c7F9CC 60%, rgba(0, 0, 0, 0) 30%), url(${sittingOnCamper})`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "#22577A",
    backgroundColor: "#80ED99",
    margin: "auto",
    maxWidth: 500,
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      style={{ minHeight: "100vh",}}
    >
     <Typography>Where do you want to go?</Typography>
    </Grid>
  );
};
