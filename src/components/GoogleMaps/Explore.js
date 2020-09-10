import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ComplexGrid } from "./ComplexGrid";
import { Map } from "./Map";

const useStyles = makeStyles((theme) => ({
    root: {
     
    },
  }));

  export const Explore = () => {
    const classes = useStyles();
    return (
        
            <Grid container spacing={3} >
                <Grid item lg={3} sm={3} xl={3} xs={3}>
                    <ComplexGrid />
                </Grid>
                <Grid item lg={9} sm={9} xl={9} xs={9}>
                   <Map />
                </Grid>
            </Grid>
        
    );
  };