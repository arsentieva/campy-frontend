import React, { useState, useEffect, useContext } from "react";
// import CalendarMaterialUIPickers from "./Calendar";
import DayPickerRangeControllerWrapper from "./New-Calendar";
import { LocationImages } from "./LocationImages";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Grid from '@material-ui/core/Grid';

import { url } from "../config";

import { CampyContext } from "../CampyContext";

const useStyles = makeStyles((theme) => ({
  background: {
    background: "#2a475c",
    height: "100vh",
    width: "100%",
    marginTop: "75px",
    marginBottom: "310px",
  },
  details: {
    "& ul": {
      listStyleType: "none",
      padding: "0px 5px",
    },
    "& > *": {
      margin: "10px",
      color: "white",
    },
    background: "#2a475c",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  detailsImage: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "300px",
    maxHeight: "300px",
    width: "100%",
    "& > div": {
      margin: "0px 10px",
    },
  },
  detailsInfo: {
    "& p": {
      color: "black",
    },
    display: "flex",
    padding: "5px",
    width: "100%",
    fontWeight: "bold",
    background: "#e2e8f0",
  },
  checkbox1: {
    fontWeight: "bold",
    maxWidth: "100%",
    background: "#e2e8f0",
    height: "380px",
  },
  checkbox2: {
    fontWeight: "bold",
    background: "#e2e8f0",
    height: "380px",
  },
  calendar: {
    display: "flex",
    flexGrow: 1,
    fontWeight: "bold",
    background: "#e2e8f0",
    padding: "5px",
  },
  revNComment: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "70px",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
    background: "#e2e8f0",
    minWidth: "390px",
    maxWidth: "600px",
    padding: "5px",
    color: "black",
  },
  comment: {
    "& p": {
      color: "black",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 1,
    padding: "5px",
    fontWeight: "bold",
    background: "#e2e8f0",
  },
  pic: {
    width: "200px",
    height: "200px",
  },
}));

export const LocationDetail = (props) => {
  const classes = useStyles();
  const id = window.location.pathname.split("/")[2];
  const [review, setReview] = useState([]);
  const { location, loadLocation, authToken } = useContext(CampyContext);

  const addressMaker = (location) => {
    return `${location.address} ${location.city}, ${location.state}`
  }

  useEffect(() => {
    if (!location) {
      loadLocation(id)
    }
    (async function fetchReview() {
      const res = await fetch(`${url}/locations/${id}/reviews`);
      const json = await res.json();
      setReview(json.reviews);
    })();
  }, [location]);


  return (
    <Box className={classes.background}>
      <div className={classes.details}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Paper elevation={5} className={classes.detailsInfo}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Location:"
                    secondary={location && addressMaker(location) || "Loading..."}
                    >
                  </ListItemText>
                  <ListItemText
                    primary="GPS Coordinates:"
                    secondary={location && location.gps_coords || "Loading..."}
                    />
                  <ListItemText
                    primary="Website:"
                    secondary={location && location.website ? location.website : "None"}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Max Days:"
                    secondary={location && location.max_days || "Loading..."}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Pad Type:"
                    secondary={location && location.pad_type || "Loading..."}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Description:"
                    secondary={location && location.description || "Loading..."}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Host Notes:"
                    secondary={location && location.host_notes || "Loading..."}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Grid container style={{minHeight: "400px"}} justify="center" alignContent="center">
              {location
                ? <LocationImages location={location} images={location.image_urls} />
                : "Loading..."
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={5} className={classes.checkbox1}>
              <List>
                <ListItem>
                  <ListItemText primary="Electric Hookup:" />
                  <Checkbox
                    disabled
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    checked={location && location.electric_hookup || false}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Water Hookup:" />
                  <Checkbox
                    disabled
                    checked={location && location.water_hookup || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Septic Hookup:" />
                  <Checkbox
                    disabled
                    checked={location && location.septic_hookup || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Assigned Parking:" />
                  <Checkbox
                    disabled
                    checked={location && location.assigned_parking || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tow Vehicle Parking:" />
                  <Checkbox
                    disabled
                    checked={location && location.tow_vehicle_parking || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Trash Removal:" />
                  <Checkbox
                    disabled
                    checked={location && location.trash_removal || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={5} className={classes.checkbox2}>
              <List>
                <ListItem>
                  <ListItemText primary="Water Front:" />
                  <Checkbox
                    disabled
                    checked={location && location.water_front || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Pets Allowed:" />
                  <Checkbox
                    disabled
                    checked={location && location.pets_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Internet Access:" />
                  <Checkbox
                    disabled
                    checked={location && location.internet_access || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="RV Compatible:" />
                  <Checkbox
                    disabled
                    checked={location && location.rv_compatible || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Generators Allowed:" />
                  <Checkbox
                    disabled
                    checked={location && location.generators_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fires Allowed:" />
                  <Checkbox
                    disabled
                    checked={location && location.fires_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="primary" />}
                    />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12} sm={12} md={5} >
            <Paper elevation={5} className={classes.calendar}>
              <List>
                <ListItem>
                  <DayPickerRangeControllerWrapper authToken={authToken} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h1 style={{ display: "flex", justifyContent: "center" }}>Reviews</h1>
        </Grid>
        {review.map((x, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Box className={classes.revNComment}>
              <Paper elevation={5} className={classes.review}>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Overall</Typography>
                  <Rating size="small" value={x.overall_rating || 0} readOnly />
                  <Typography component="legend">Noise</Typography>
                  <Rating size="small" value={x.noise || 0} readOnly />
                  <Typography component="legend">Safety</Typography>
                  <Rating size="small" value={x.safety || 0} readOnly />
                  <Typography component="legend">Cleanliness</Typography>
                  <Rating size="small" value={x.cleanliness || 0} readOnly />
                  <Typography component="legend">Access</Typography>
                  <Rating size="small" value={x.access || 0} readOnly />
                  <Typography component="legend">Site Quality</Typography>
                  <Rating size="small" value={x.site_quality || 0} readOnly />
                </Box>
                <List className={classes.comment}>
                  <ListItem>
                    <ListItemText
                      primary={`${x.user_first_name} ${x.user_last_name}`}
                      secondary={x.comments}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Grid>
        ))}
      </div>
    </Box >
  );
};
