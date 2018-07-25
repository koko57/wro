import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
   render() {
   const GoogleMapExample = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 51.110903, lng: 17.035538 } }
        defaultZoom = { 15 }>
        <Marker
      position={{ lat: 51.1182005, lng: 17.0400579 }}
    />
    <Marker
      position={{ lat: 51.105362,
        lng: 17.0315874 }}
    />
    <Marker
      position={{ lat: 51.1094935,
        lng: 17.028659 }}
    /><Marker
    position={{ lat: 51.10238529999999,
        lng: 17.0300293 }}
  />
    
    
      </GoogleMap>
     
   )));
   return(
      <div>
        <GoogleMapExample
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB05dcc0ITwKkEM0PomMgtsobDCE2evMHM&libraries=drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
          containerElement={ <div style={{ height: '100vh', width: '80%' }} /> }
          mapElement={ <div style={{ height: '100%' }} /> }
        />
      </div>
   );
   }
};
export default Map;
