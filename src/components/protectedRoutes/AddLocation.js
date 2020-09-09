import React, { useContext, useEffect, useState } from "react";
import { CampyContext } from "../../CampyContext";
import { useHistory, Redirect } from "react-router-dom";
import {
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  TextareaAutosize,
  IconButton,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import Axios from "axios";
import url from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    background: theme.palette.secondary.main,
  },
  button: {
    width: "200px",
  },
}));
const checkBoxStyles = (theme) => ({
  root: {
    "&$checked": {
      color: "#3D70B2",
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);
export const AddLocation = () => {
  
  const history = useHistory();
  const classes = useStyles();
  const { currentUser, authAxios } = useContext(CampyContext);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gps_coords, setGPS_Coords] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [host_notes, setHost_Notes] = useState("");
  
  const [electric_hookup, setElectric_Hookup] = useState(false);
  const [water_hookup, setWater_Hookup] = useState(false);
  const [septic_hookup, setSeptic_Hookup] = useState(false);
  const [assigned_parking, setAssigned_Parking] = useState(false);
  const [water_front, setWater_Front] = useState(false);
  const [tow_vehicle_parking, setTow_Vehicle_Parking] = useState(false);
  const [trash_removal, setTrash_Removal] = useState(false);
  const [pets_allowed, setPets_Allowed] = useState(false);
  const [internet_access, setInternet_Access] = useState(false);

  const [rv_compatible, setRv_Compatible] = useState(false);
  const [generators_allowed, setGenerators_Allowed] = useState(false);
  const [fires_allowed, setFires_Allowed] = useState(false);
  const [max_days, setMax_Days] = useState(0);
  const [pad_type, setPad_Type] = useState("");

  let locationData = [];

  const handleSubmit = () => {
    Axios.post(`${url}/locations`, {
      address: address,
      city: city,
      state: state,
      gps_coords: gps_coords,
      image_urls: [],
      website: website,
      description: description,
      host_notes: host_notes,
      active: true,
      electric_hookup: electric_hookup,
      water_hookup: water_hookup,
      septic_hookup: septic_hookup,
      assigned_parking: assigned_parking,
      tow_vehicle_parking: tow_vehicle_parking,
      trash_removal: trash_removal,
      water_front: water_front,
      pets_allowed: pets_allowed,
      internet_access: internet_access,
      rv_compatible: rv_compatible,
      generators_allowed: generators_allowed,
      fires_allowed: fires_allowed,
      max_days: max_days,
      pad_type: pad_type,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          const { location } = res.data;
          for (const loc in location) {
            locationData.push(`${loc}: ${location[loc]}`);
          }
          console.log(locationData);
          const str = locationData[0]
          const matches = str.match(/\d+/g);
          const id = matches[0]
          history.push(`/locations/${id}/edit-location-pic`);
        }
      })

      .catch((err) => console.log(err));
  };
  
  return currentUser ? (
    <Grid
      container
      component="form"
      className={classes.root}
      spacing={5}
      onSubmit={handleSubmit}
    >
      <Grid item xs={12} container justify="center">
        <Typography color="primary" variant="h2">
          Set Up a New Location
        </Typography>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={6} container direction="column">
        <TextField
          label="Street Address"
          placeholder="123 Main St."
          margin="dense"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="City"
          value={city}
          placeholder="Austin"
          margin="dense"
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="State"
          value={state}
          placeholder="Texas"
          margin="dense"
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          label="GPS Coordinates"
          value={gps_coords}
          placeholder="ex: '34.000872,-118.806839'"
          margin="dense"
          onChange={(e) => setGPS_Coords(e.target.value)}
        />
        <TextField
          label="Website"
          value={website}
          placeholder="ex: www.my-awesome-location.com"
          margin="dense"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          label="Short Description"
          value={description}
          placeholder="ex: Lovely waterfront cement pad with hookups"
          margin="dense"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Pad Type"
          value={pad_type}
          placeholder="ex: paved, dirt, etc."
          margin="dense"
          onChange={(e) => setPad_Type(e.target.value)}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Max Days Allowed"
          type="number"
          value={max_days}
          margin="dense"
          onChange={(e) => setMax_Days(e.target.value)}
        />
        <br />
        <TextareaAutosize
          value={host_notes}
          rowsMin={8}
          style={{ width: "100%" }}
          onChange={(e) => setHost_Notes(e.target.value)}
          placeholder="Enter any location specific notes you wish to share..."
        />
      </Grid>

      <Grid container item xs={3}>
        <Grid item direction="column" spacing={3} container>
          <Grid item>
            <FormControl component="fieldset" className={classes.FormControl}>
              <FormLabel component="legend">Ammenities</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={electric_hookup}
                      onChange={(e) => setElectric_Hookup(!electric_hookup)}
                    />
                  }
                  label="Electric Hookup"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={water_hookup}
                      onChange={(e) => setWater_Hookup(!water_hookup)}
                    />
                  }
                  label="Water Hookup"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={septic_hookup}
                      onChange={(e) => setSeptic_Hookup(!septic_hookup)}
                    />
                  }
                  label="Septic Hookup"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={assigned_parking}
                      onChange={(e) => setAssigned_Parking(!assigned_parking)}
                    />
                  }
                  label="Assigned Parking"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={tow_vehicle_parking}
                      onChange={(e) =>
                        setTow_Vehicle_Parking(!tow_vehicle_parking)
                      }
                    />
                  }
                  label="Parking for Tow Vehicle"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={trash_removal}
                      onChange={(e) => setTrash_Removal(!trash_removal)}
                    />
                  }
                  label="Trash Removal"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={pets_allowed}
                      onChange={(e) => setPets_Allowed(!pets_allowed)}
                    />
                  }
                  label="Pets Allowed"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={internet_access}
                      onChange={(e) => setInternet_Access(!internet_access)}
                    />
                  }
                  label="Internet Access"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={water_front}
                      onChange={(e) => setWater_Front(!water_front)}
                    />
                  }
                  label="Water Front"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl component="fieldset" className={classes.FormControl}>
              <FormLabel component="legend">Necessities</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={rv_compatible}
                      onChange={(e) => setRv_Compatible(!rv_compatible)}
                    />
                  }
                  label="RV Compatible"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={generators_allowed}
                      onChange={(e) =>
                        setGenerators_Allowed(!generators_allowed)
                      }
                    />
                  }
                  label="Generators Allowed"
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      value={fires_allowed}
                      onChange={(e) => setFires_Allowed(!fires_allowed)}
                    />
                  }
                  label="Fires Allowed"
                />
                <br />
              </FormGroup>
              <IconButton onClick={handleSubmit} className={classes.button}>
                <Send />
                <Typography>Submit</Typography>
              </IconButton>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};
