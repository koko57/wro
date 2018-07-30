import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {
    
    render() {
        let coffeeSpots = this.props.places.map(loc => 
            (<Marker position={{lat: loc.lat, lng: loc.lng }} key={loc.fullName}>
              <InfoWindow><p>{loc.fullName}</p></InfoWindow>
            </Marker>)
        ); 
        const GoogleMapExample = withScriptjs(withGoogleMap(props => (
            <GoogleMap
                defaultCenter = {{ lat: 51.110903, lng: 17.033538 }}
                defaultZoom = { 14 }>
                {coffeeSpots}
            </GoogleMap>
   )));
   return(
      <div>
        <GoogleMapExample
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB05dcc0ITwKkEM0PomMgtsobDCE2evMHM&libraries=drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={ <div style={{ height: 'calc(100vh - 70px)', width: '80%', float: 'right' }} /> }
        mapElement={ <div style={{ height: '100%' }} /> }
        />
      </div>
   );
   }
};
export default Map;
