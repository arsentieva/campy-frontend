import React, {useState, useRef, useCallback} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Grid, Typography, IconButton, CardMedia , Paper, Box } from "@material-ui/core";
import WifiIcon from '@material-ui/icons/Wifi';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import mapStyle from "./mapStyle";
import places from "./places";
import usePlacesAutoComplete , {getGeocode, getLatLng} from "use-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import campImageOne from "../../assets/coupleByCamper.jpg"
import campImageTwo from "../../assets/camperInField.jpg"
import campImageThree from "../../assets/camperUnderStars.jpg"
import campImageFour from "../../assets/groupAtTable.jpg"
import campImageFive from "../../assets/personOnRV.jpg"
import campImageSix from "../../assets/sittingOnCamper.jpg"

const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    top: theme.spacing(13),
    maxWidth:400,
    height: 48,
    zIndex: 10,
  },
  locate: {
    position: "absolute",
    top: theme.spacing(13),
    right: theme.spacing(10),
    maxWidth:400,
    height: 48,
    zIndex: 10,
    border: "2px solid #39A5A7"
  },
  root: {
    flexGrow: 1,
    top: theme.spacing(10),
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
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

const containerStyle = {
  width: "70vw",
  height: "100vh",

};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
};

const libraries = ["places"]

let lat=47.599361;
let lng=-122.332111;

function showCoords(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;

}
function geo_error(error) {
  switch(error.code) {
      case error.TIMEOUT:
          alert('Geolocation Timeout');
          break;
      case error.POSITION_UNAVAILABLE:
          alert('Geolocation Position unavailable');
          break;
      case error.PERMISSION_DENIED:
          alert('Geolocation Permission denied');
          break;
      default:
          alert('Geolocation returned an unknown error code: ' + error.code);
  }
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showCoords, geo_error)
    console.log("got location")
}

const images = [campImageOne, campImageTwo, campImageThree, campImageFour, campImageFive, campImageSix]

export const GoogleMapComponent = () => {

  getCurrentPosition();
  const mapRef= useRef();
  const [selected, setSelected ]= useState(null);
  const panTo = useCallback(({lat, lng})=> {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(10);
  }, [])

  const onMapLoad = useCallback((map)=> {
    mapRef.current= map;
  }, []);

  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return "Error loading maps";
  }
  if ( !isLoaded) {
    return "Loading Maps";
  }

  let imageUrl= "http://maps.google.com/mapfiles/kml/shapes/campground.png";

  return (
    <div>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={4}>
          <div style={{ height: "80px" }} />
          {places.slice(0, 5).map((place) => (
            <div key={place.id}>
              <ComplexGrid
                imagePath={images[place.id - 1]}
                campTitle={place.campgroundName}
                campState={place.state}
                campRating={place.rating}
                campMaxDays={place.maxDays}
              />
            </div>
          ))}
        </Grid>
        <Grid
          item
          container
          xs={8}
          alignContent="flex-end"
          justify="center"
          direction="column"
        >
          <Search panTo={panTo} />
          <Locate panTo={panTo} />
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat, lng }}
            zoom={8}
            options={options}
            onLoad={onMapLoad}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                icon={{
                  url: imageUrl,
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setSelected(place);
                }}
              />
            ))}
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <h2> {selected.campgroundName} </h2>
                </div>
              </InfoWindow>
            ) : null}
            <></>
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  );
}

function Locate({ panTo }) {
  const classes = useStyles();
  let compassUrl= "http://maps.google.com/mapfiles/kml/pal3/icon28.png";
  return (
    <button
    className={classes.locate}
      onClick={() => {
        panTo({lat, lng });
      }}
    >
      <img src={compassUrl} alt="compass" />
    </button>
  );
}

function Search({panTo}){
  const classes = useStyles();
   const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutoComplete({
     requestOptions: {
       location : { lat: ()=> lat, lng: ()=> lng },
       radius: 200 * 1000,
     },
   });

   const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

   return (
    <div className={classes.search}>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput style={{ width: 400, height:48, borderRadius: 3, border: "2px solid #39A5A7"}}
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Where to next?"
          />
          <ComboboxPopover>
            <ComboboxList style={{ width: 400 }}>
              {status === "OK" && data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
  );
}

function ComplexGrid({ imagePath, campTitle, campState, campRating, campMaxDays}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={4}>
          <Grid item>
          <CardMedia  className={classes.cover} image={imagePath} title="Live from space album cover" />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">{campTitle}</Typography>
                <Typography variant="body2" gutterBottom>{campState}</Typography>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Overall Rating</Typography>
                  <Rating
                    name="customized-empty"
                    defaultValue={campRating}
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
                <IconButton >
                  <NightsStayIcon style={{fontSize: 40, color: "#39A5A7"}}/>
                  <Typography variant="subtitle1">Max {campMaxDays} </Typography>
                </IconButton>
              </Grid>
                <IconButton >
                  <WifiIcon style={{fontSize: 40, color: "#39A5A7"}}/>
                </IconButton>
              </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
