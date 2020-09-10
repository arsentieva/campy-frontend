import React, { useContext, useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ComplexGrid } from "./ComplexGrid";
import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
  }));

export const LocationItems = () => {

    const { loadLocations, locations } = useContext(CampyContext);
    const classes = useStyles();

    useEffect(()=>{
        loadLocations();
    }, [])
    
    return (  
        <Box className={classes.root}>
        
         {
             locations ===undefined ? null :
             locations.map((location) => (
                    <ComplexGrid key={location.id} />
                ))
        }
      
        </Box>
    );
}