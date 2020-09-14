import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ComplexGrid } from "./ComplexGrid";
import { CampyContext } from "../../CampyContext";

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      marginTop: "80px",
      overflowY: "scroll",
      height: "89vh"
    },
  }));

export const LocationItems = () => {

    const { locations } = useContext(CampyContext);
    const classes = useStyles();
    
    return (  
        <Box className={classes.root}>
        
         {
             locations ===undefined ? null :
             locations.map((location) => (
                    <ComplexGrid key={location.id} location={location} />
                ))
        }
      
        </Box>
    );
}