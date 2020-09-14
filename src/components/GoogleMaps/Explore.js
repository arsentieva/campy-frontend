import React, { useEffect, useContext} from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LocationItems } from "./LocationItems";
import { Map } from "./Map";
import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles((theme) => ({
    root: {
    paddingRight: theme.spacing(0.5)
    },
  }));
  

  export const Explore = () => {
    const { loadLocations } = useContext( CampyContext);
    useEffect(()=>{
      loadLocations();
  }, []);

    const classes = useStyles();
    return (
        
            <Grid container  >
                <Grid item lg={3} sm={3} xl={3} xs={3} className= {classes.root}>
                    <LocationItems  />
                </Grid>
                <Grid item lg={9} sm={9} xl={9} xs={9}>
                   <Map />
                </Grid>
            </Grid>
        
    );
  };