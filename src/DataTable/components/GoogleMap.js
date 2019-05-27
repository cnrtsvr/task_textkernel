import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import React from "react";
import MapMarker from './MapMarker'

const LocationMap = withScriptjs(withGoogleMap((props) =>{
        return (
            <GoogleMap
                defaultZoom={14}
                center={ { lat:  props.location.lat, lng: props.location.lng } }
            >
                <MapMarker location={{ lat:  props.location.lat, lng: props.location.lng }}/>
            </GoogleMap>
        );
    }
));

export default LocationMap;