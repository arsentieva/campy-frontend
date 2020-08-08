import React, {useState, useRef, useCallback} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Grid, Typography, IconButton } from "@material-ui/core";
import mapStyle from "./mapStyle";
import places from "./places";
import usePlacesAutoComplete , {getGeocode, getLatLng} from "use-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "absolute",
    top: theme.spacing(13),
    left: theme.spacing(5),
    color: theme.palette.text.secondary,
    border: 1,
    borderRadius: 3,
    maxWidth:400,
    width:"100",
    height: 48,
    zIndex: 10
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

getCurrentPosition()

export const GoogleMapComponent = () => {

  const mapRef= useRef();
  const [zoom, setZoom]= useState(10);
  const [bounds, setBounds ]= useState(null);
  const [selected, setSelected ]= useState(null);
  const panTo = useCallback(({lat, lng})=> {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(11);
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
        <Grid item xs={4} />
        <Grid item container xs={8} alignContent="flex-end" justify="center" direction="column">
          <Search  panTo={panTo} />
          <GoogleMap mapContainerStyle={containerStyle} center={{lat, lng}} zoom={8}
              options= {options} onLoad={onMapLoad} >
              { places.map((place)=>(
                  <Marker key = {place.id}
                    position = { {lat: place.lat, lng: place.lng}}
                    icon = {{
                      url: imageUrl,
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15), }}
                    onClick = {()=> { setSelected(place)}} />
                  ))}
                  {selected ? (
                  <InfoWindow position= {{ lat:selected.lat, lng:selected.lng}} onCloseClick={()=> setSelected(null)}>
                    <div>
                      <h2> {selected.campgroundName} </h2>
                    </div>
                  </InfoWindow>) : null}
                  <></>
                </GoogleMap>
             </Grid>
        </Grid>
    </div>
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
   return (
    <div className={classes.search}>
        <Combobox
          onSelect={async(address)=> {
            setValue(address, false);
            clearSuggestions();
            try{
              const results = await getGeocode({address});
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (err) {
                console.log("error!")
            }
          }}
          >
          <ComboboxInput
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            disabled={!ready}
            placeholder="Where to next?"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" && data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>

  );
}
