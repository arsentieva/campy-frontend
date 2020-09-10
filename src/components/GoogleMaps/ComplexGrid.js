import React from "react";
import { Grid, Typography, IconButton, CardMedia, Paper, Box } from "@material-ui/core";
import WifiIcon from '@material-ui/icons/Wifi';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      top: theme.spacing(10),
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      maxWidth: 550,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    cover: {
      width: 160,
      height:160,
      padding: 0,
      paddingRight: 2
    },
  }));
  

export function ComplexGrid({ imagePath, campTitle, campState, campRating, campMaxDays}) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={4}>
            <Grid item>
            <CardMedia  className={classes.cover} image={imagePath} title="Live from space album cover" />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">{campTitle}</Typography>
                  <Typography variant="body2" gutterBottom>{campState}</Typography>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Overall Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={campRating}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit"
                      size="large"
                      readOnly />}
                    />
                 </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <IconButton >
                    <NightsStayIcon style={{fontSize: 40, color: "#39A5A7"}}/>
                    <Typography variant="subtitle1">Max {campMaxDays} </Typography>
                  </IconButton>
                </Grid>
                  <IconButton >
                    <WifiIcon style={{fontSize: 40, color: "#39A5A7"}}/>
                  </IconButton>
                </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }