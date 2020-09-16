import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CalendarMaterialUIPickers from "./Calendar";
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

import url from "../config";
import { storage, firebase } from "../Firebase/firebaseConfig";


// blake-wise-TcgASSD5G04-unsplash.jpg

const useStyles = makeStyles((theme) => ({
  background: {
    background: "#22577A",
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
    background: "#22577A",
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
      color: "white",
    },
    display: "flex",
    padding: "5px",
    width: "100%",
    fontWeight: "bold",
    background: "#22577A",
  },
  checkbox1: {
    fontWeight: "bold",
    maxWidth: "100%",
    background: "#22577A",
    height: "380px",
  },
  checkbox2: {
    fontWeight: "bold",
    background: "#22577A",
    height: "380px",
  },
  calendar: {
    display: "flex",
    flexGrow: 1,
    fontWeight: "bold",
    background: "#22577A",
    // height: "380px",
    // minWidth: "380px",
    // width: "400px",
    padding: "5px",
  },
  revNComment: {
    display: "flex",
    justifyContent: "center",
    // flexDirection: "row",
    // alignItems: "center",
    // height: "400px",
    marginBottom: "70px",
    // paddingBottom: "70px",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
    background: "#22577A",
    minWidth: "390px",
    maxWidth: "600px",
    padding: "5px",
    color: "white",
  },
  comment: {
    "& p": {
      color: "white",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 1,
    padding: "5px",
    fontWeight: "bold",
    background: "#22577A",
  },
  pic: {
    width: "200px",
    height: "200px",
  },
}));

export const LocationDetail = (props) => {
  const classes = useStyles();
  // const { id } = useParams()
  const id = window.location.pathname.split("/")[2];
  // const id = props.match.params.id

  const [location, setLocation] = useState({});
  const [review, setReview] = useState([]);
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const addressMaker = (location) => {
    return `${location.address} ${location.city}, ${location.state}`
  }

  useEffect(() => {
    (async function fetchLocation() {
      const res = await fetch(`${url}/locations/${id}`);
      const json = await res.json();
      setLocation(json.location);
    })(); // semi-colon is needed for IIFE to work

    (async function fetchReview() {
      const res = await fetch(`${url}/locations/${id}/reviews`);
      const json = await res.json();
      setReview(json.reviews);
    })();
  }, []);
  const file = "blake-wisz-TcgASSD5G04-unsplash.jpg";
  const storageRef = storage.ref(`location_images/`);

  useEffect(() => {
    if (location) {
      (function setFirebaseImage() {
        setImages(location.image_urls);
      })();
    }
  }, [location]);

  useEffect(() => {
    if (images) {
      (async function getFirebaseUrls() {
        console.log(images);
        let urlArray = []
        for (let i = 0; i < images.length; i++) {
          const downloadUrl = await storageRef.child(images[i]).getDownloadURL().then((url) => url)
          urlArray.push(downloadUrl);
        }
        setUrls(urlArray);
      })();
    }
  }, [images]);


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
                    secondary={addressMaker(location) || "Loading..."}
                  >
                  </ListItemText>
                  <ListItemText
                    primary="GPS Coordinates:"
                    secondary={location.gps_coords || "Loading..."}
                  />
                  <ListItemText
                    primary="Website:"
                    secondary={location.website ? location.website : "None"}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Max Days:"
                    secondary={location.max_days || "Loading..."}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Pad Type:"
                    secondary={location.pad_type || "Loading..."}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Description:"
                    secondary={location.description || "Loading..."}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    primary="Host Notes:"
                    secondary={location.host_notes || "Loading..."}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Grid container justify="center" alignItems="center">
              {location.image_urls
                ? urls.map((image, i) => (
                  <Grid key={i} item>

                    <img
                      className={classes.pic}
                      src={image}
                      alt={`location-pic-${i}`}
                    />

                  </Grid>
                ))
                : "Pictures Here"}
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
                    checkedIcon={<CircleChecked color="secondary" />}
                    checked={location.electric_hookup || false}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Water Hookup:" />
                  <Checkbox
                    disabled
                    checked={location.water_hookup || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Septic Hookup:" />
                  <Checkbox
                    disabled
                    checked={location.septic_hookup || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Assigned Parking:" />
                  <Checkbox
                    disabled
                    checked={location.assigned_parking || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tow Vehicle Parking:" />
                  <Checkbox
                    disabled
                    checked={location.tow_vehicle_parking || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Trash Removal:" />
                  <Checkbox
                    disabled
                    checked={location.trash_removal || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
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
                    checked={location.water_front || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Pets Allowed:" />
                  <Checkbox
                    disabled
                    checked={location.pets_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Internet Access:" />
                  <Checkbox
                    disabled
                    checked={location.internet_access || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="RV Compatible:" />
                  <Checkbox
                    disabled
                    checked={location.rv_compatible || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Generators Allowed:" />
                  <Checkbox
                    disabled
                    checked={location.generators_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fires Allowed:" />
                  <Checkbox
                    disabled
                    checked={location.fires_allowed || false}
                    icon={<CircleUnchecked color="primary" />}
                    checkedIcon={<CircleChecked color="secondary" />}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid container item xs={12} sm={12} md={5} >
            <Paper elevation={5} className={classes.calendar}>
              <List>
                <ListItem>
                  <CalendarMaterialUIPickers />
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
              {/* <Paper elevation={5} className={classes.review}>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Overall Rating</Typography>
                  <Rating value={x.overall_rating || 0} readOnly />
                  </Box>
                  <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Noise</Typography>
                  <Rating value={x.noise || 0} readOnly />
                  </Box>
                  <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Safety</Typography>
                  <Rating value={x.safety || 0} readOnly />
                  </Box>
                  <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Cleanliness</Typography>
                  <Rating value={x.cleanliness || 0} readOnly />
                  </Box>
                <Box component="fieldset" borderColor="transparent">
                <Typography component="legend">Access</Typography>
                <Rating value={x.access || 0} readOnly />
                </Box>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Site Quality</Typography>
                  <Rating value={x.site_quality || 0} readOnly />
                  </Box>
                </Paper> */}
              {/* <Paper elevation={5} className={classes.comment}>
                <List>
                <ListItem>
                <ListItemText primary={`${x.user_first_name} ${x.user_last_name}`} secondary={x.comments} />
                </ListItem>
                </List>
              </Paper> */}
            </Box>
          </Grid>
        ))}
      </div>
    </Box >
  );
};
