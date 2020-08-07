import React from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyle from "./mapStyle";

const containerStyle = {
  width: "100vw",
  height: "40vh",
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
};

const libraries = ["places"]

let lat=0;
let lng=0;

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

  return (
    <div>

        <GoogleMap mapContainerStyle={containerStyle} center={{lat, lng}} zoom={10} options= {options}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>

    </div>
  );
}
