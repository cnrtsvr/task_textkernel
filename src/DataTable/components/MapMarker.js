import React from "react";
import { Marker } from "react-google-maps";

const MapMarker = (props) => {
    return(
        <Marker
            position={props.location}
        >
        </Marker>
    );
};

export default MapMarker;