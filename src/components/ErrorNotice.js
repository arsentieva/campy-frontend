import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  errorNotice: {
    margin: '1rem 0',
    padding: '0.5rem',
    border: '1px solid #e07c7c',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8d6d6'
  },
  errorButton: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#df4343",
    color: "#ffffff",
  },
}));

export const ErrorNotice = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.errorNotice}>
      <Typography >
        {props.message}
        <Button className={classes.errorButton} onClick={props.clearError}>
          X
        </Button>
      </Typography>
    </div>
  );
};
