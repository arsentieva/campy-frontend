import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "40vh",
};

const center = {
  lat: 30.2672,
  lng: -97.7431,
};
const key = 'AIzaSyADACPgre6kS5Osy4cDzz15p5jF5sAwbqQ';

export const GoogleMapComponent = () => {
  return (
    <div>
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

