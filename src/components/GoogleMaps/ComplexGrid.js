import React , { useContext }from "react";
import { Grid, Typography, IconButton, Paper, Box } from "@material-ui/core";
import WifiIcon from '@material-ui/icons/Wifi';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/core/styles";
import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    paper: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      padding: theme.spacing(1.5),
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
  

export function ComplexGrid({ location }) {
    const classes = useStyles();
    const { loadLocation } = useContext(CampyContext);
    const handleClick = () => {
      loadLocation(location.id);
    }
  
    return (
      <div className={classes.root} onClick={handleClick}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">{location.title}</Typography>
                  <Typography variant="body2" gutterBottom>{location.state}</Typography>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Overall Rating</Typography>
                    <Rating
                      name="customized-empty"
                      defaultValue={3}
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
                    <Typography variant="subtitle1">Max {2} </Typography>
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