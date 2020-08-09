import React, { useContext, useEffect, useState } from "react";
import { CampyContext } from "../../context/CampyContext";
import {
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

export const AddLocation = () => {
  const classes = useStyles();
  const { currentUser, getUser, userID, authAxios } = useContext(CampyContext);
  const [id, setId] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gps_coords, setGPS_Coords] = useState("");
  const image_urls = [];
  const [website, setWebsite] = useState("");
  const [description, sestDescription] = useState("");
  const [host_notes, setHost_Notes] = useState("");
  const [active, setActive] = useState(true);
  const user_id = userID;
  const location_data = {
    address,
    city,
    state,
    gps_coords,
    image_urls,
    website,
    description,
    host_notes,
    active,
    user_id,
  };
  const [electric_hookup, setElectric_Hookup] = useState(false);
  const [water_hookup, setWater_Hookup] = useState(false);
  const [septic_hookup, setSeptic_Hookup] = useState(false);
  const [assigned_parking, setAssigned_Parking] = useState(false);
  const [tow_vehicle_parking, setTow_Vehicle_Parking] = useState(false);
  const [trash_removal, setTrash_Removal] = useState(false);
  const [pets_allowed, setPets_Allowed] = useState(false);
  const [internet_access, setInternet_Ac] = useState(false);
  const amenity_data = {
    electric_hookup,
    water_hookup,
    septic_hookup,
    assigned_parking,
    tow_vehicle_parking,
    trash_removal,
    pets_allowed,
    internet_access,
  };

  const [rv_compatible, setRv_Compatible] = useState(false);
  const [generators_allowed, setGenerators_Allowed] = useState(false);
  const [fires_allowed, setFires_Allowed] = useState(false);
  const [max_days, setMax_Days] = useState(false);
  const [pad_type, setPet_Type] = useState(false);
  const necessity_data = {
    rv_compatible,
    generators_allowed,
    fires_allowed,
    max_days,
    pad_type,
  };

  const handlePut = (id) => {
    authAxios.put(`http://localhost:5000/locations/${id}`, {
      location_data,
      amenity_data,
      necessity_data,
    });
  };

  const handleSubmit = () => {
    authAxios
      .post("https://localhost:5000/locations", {
        amenity_data,
        necessity_data,
      })
      .then((res) => {
        if (res.status === 200) {
          const { id } = res.data;
          setId(id);
        }
      }).then((id) => handlePut(id));
  };

  useEffect(() => {
    const getUserData = async () => {
      await getUser(userID);
    };
    getUserData();
  }, [userID]);
  return currentUser ? (
    <Grid container component="form" onSubmit={handleSubmit}>
      <Grid item container>
        <TextField
          lable="Street Address"
          placeholder="123 Main St."
          margin="dense"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          lable="City"
          value={city}
          placeholder="Austin"
          margin="dense"
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          lable="State"
          value={state}
          placeholder="Texas"
          margin="dense"
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          lable="GPS Coordinates"
          value={gps_coords}
          placeholder="ex: 90deg N, 50deg W"
          margin="dense"
          onChange={(e) => setGPS_Coords(e.target.value)}
        />
        <TextField
          lable="Website"
          value={website}
          placeholder="ex: www.my-awesome-location.com"
          margin="dense"
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          lable="Short Description"
          value={description}
          placeholder="ex: Lovely waterfront cement pad with hookups"
          margin="dense"
          onChange={(e) => sestDescription(e.target.value)}
        />

        <TextareaAutosize
          value={host_notes}
          rowsMin={8}
          style={{ width: "100%" }}
          onChange={(e) => setHost_Notes(e.target.value)}
          placeholder="Enter any location specific notes you wish to share..."
        />
        <TextField />
      </Grid>
      <Grid item container>
        <FormGroup></FormGroup>
      </Grid>
      <Grid item container>
        <FormGroup></FormGroup>
      </Grid>
      <IconButton>
        <Send />
        Submit Location
      </IconButton>
    </Grid>
  ) : null;
};
