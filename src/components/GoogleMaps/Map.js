import React, {useState, useRef, useCallback, useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Grid, Box, Button } from "@material-ui/core";
import mapStyle from "./mapStyle";
import usePlacesAutoComplete , {getGeocode, getLatLng} from "use-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import { CampyContext } from "../../CampyContext";
import "@reach/combobox/styles.css";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    marginTop: theme.spacing(11),
    left: "calc(50vw - 5px)",
    maxWidth:400,
    height: 48,
    zIndex: 10,
  },
  locate: {
    position: "absolute",
    marginTop: theme.spacing(11),
    right: theme.spacing(3),
    maxWidth:400,
    height: 48,
    zIndex: 10,
    border: "2px solid #39A5A7"
  },
}));

const containerStyle = {
  width: "75vw",
  height: "97vh",
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

export const Map = () => {
  getCurrentPosition();
  const history = useHistory();
  const { locations, location, loadLocation } = useContext(CampyContext);
  const mapRef= useRef();
  const [selected, setSelected ]= useState(null);
  const panTo = useCallback(({lat, lng})=> {
    mapRef.current.panTo({lat, lng})
    // mapRef.current.setZoom(10);
  }, [])

  const getLat = (loc) => {
    let currentLat= loc.split(",")[0];
    return parseFloat(currentLat.trim());
  }
  const getLng = (loc) => {
    let currentLng= loc.split(",")[1];
    return parseFloat(currentLng.trim());
  }

  useEffect(()=>{
   if(location) {
     setSelected(location);
     let thisLat = getLat(location.gps_coords);
     let thisLng = getLng(location.gps_coords);
     console.log(thisLat, thisLng);
     panTo({ lat:thisLat, lng: thisLng});
   } else {
     setSelected(null);
   }
  }, [location]);
  
  const onMapLoad = useCallback((map)=> {
    mapRef.current= map;
  }, []);

  const {isLoaded, loadError} = useLoadScript ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return "Error loading maps";
  };

  if ( !isLoaded) {
    return "Loading Maps";
  };

   const handleSelection = (location) => {
    setSelected(location);
    panTo ({ lat: getLat(location.gps_coords), lng: getLng(location.gps_coords)});
   };

   const handleRedirect = (id) => {
    loadLocation(id);
    history.push(`/location-detail/${id}`);
   };


  let imageUrl= "http://maps.google.com/mapfiles/kml/shapes/campground.png";

  return (
    <Box>
      <Grid container>
        <Grid item>
          <Search panTo={panTo} />
          <Locate panTo={panTo} />
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={8} options={options} onLoad={onMapLoad}>
            { locations ===undefined ? null : locations.map((location) => (
                <Marker
                key={location.id}
                position={{ lat: getLat(location.gps_coords), lng: getLng(location.gps_coords) }}
                icon={{
                  url: imageUrl,
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => { handleSelection(location); }}
              />
            ))}
            {selected ? (<InfoWindow position={{ lat: getLat(selected.gps_coords), lng: getLng(selected.gps_coords) }}
                onCloseClick={() => setSelected(null)} >
                <Box>
                  <h2> {selected.title} </h2>
                  <Button color="primary"  size="small" onClick={()=> handleRedirect(selected.id)}> Learn More </Button>
                </Box>
              </InfoWindow>
            ) : null}
            <></>
          </GoogleMap>
        </Grid>
      </Grid>
    </Box>
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
    <Box className={classes.search}>
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
      </Box>
  );
}


