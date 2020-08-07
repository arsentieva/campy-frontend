import React, {useState, useRef, useCallback} from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Grid, Typography, IconButton } from "@material-ui/core";
import mapStyle from "./mapStyle";
import places from "./places";


const containerStyle = {
  width: "50vw",
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
        <Grid
        item
        container
        xs={8}
        alignContent="flex-end"
        justify="center"
        direction="column"
      >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{lat, lng}}
              zoom={8}
              options= {options}
              onLoad={onMapLoad}
            >
                  {
                  places.map((place)=>(
                    <Marker key = {place.id}
                    position = { {lat: place.lat, lng: place.lng}}
                    icon = {{
                      url: imageUrl,
                      scaledSize: new window.google.maps.Size(30, 30),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(15, 15),
                    }}
                    onClick = {()=> { setSelected(place)}}
                    />
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
