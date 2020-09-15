import React, { useContext,  createRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CampyContext } from "../../CampyContext";
import { Grid, Typography, IconButton, Paper, Box } from "@material-ui/core";
import WifiIcon from '@material-ui/icons/Wifi';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Rating from '@material-ui/lab/Rating';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: "80px",
      overflowY: "scroll",
      height: "89vh"
    },
    card: {
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

export const LocationItems = () => {
  const { locations, location, loadLocation } = useContext(CampyContext);
  const refs = locations ? locations.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {}) : undefined;
  
    const scrollToLocationCard = (id) => {
      refs && refs[id].current && refs[id].current.scrollIntoView({behavior: "smooth"});
      }

    const classes = useStyles();

    const history = useHistory();

    const handleClick = (id) => {
      loadLocation(id);
    }

     useEffect(()=> {
       if(location){
        refs && refs[location.id].current && refs[location.id].current.scrollIntoView({behavior: "smooth"});
       }
    //  }, [location, scrollToLocationCard]);
     }, [location, refs]);
    
     const handleRedirect = (id) => {
      loadLocation(id);
      history.push(`/location-detail/${id}`);
     }
    return (  
        <Box className={classes.root}>
         {   locations === undefined ? null :
             locations.map((location) => (
                <Box className={classes.card} onClick={()=>handleClick(location.id)}>
                   <Paper key={location.id} ref={refs[location.id]} className={classes.paper} elevation={3}>
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
                              <NightsStayIcon style={{fontSize: 20, color: "#39A5A7"}}/>
                              <Typography variant="subtitle1">Max {2} </Typography>
                           
                          </Grid>
                          <Grid item>
                              <WifiIcon style={{fontSize: 20, color: "#39A5A7"}}/>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={()=>handleRedirect(location.id)}>
                              <OpenInNewIcon style={{fontSize: 30, color: "#39A5A7"}}/>
                            </IconButton>
                          </Grid>
                      </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
                ))
        }
              </Box>
    );
}