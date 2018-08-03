import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Spot from './Spot'

class Map extends Component {
    

    render() {
        const { placeFilter } = this.props;
        let {places} = this.props;
        let spots = places.map(loc => 
            (<Spot position={{lat: loc.lat, lng: loc.lng }} key={loc.fullName} type={loc.type} name={loc.fullName}/>)
        ); 
        
        const GoogleMapExample = withScriptjs(withGoogleMap(props => (
            <GoogleMap
                defaultCenter = {{ lat: 51.110903, lng: 17.033538 }}
                defaultZoom = { 13 }>
                {placeFilter ? spots.filter(loc => loc.props.type === placeFilter) : spots}
            </GoogleMap>
   )));
   return(
       <div className="map">
            <GoogleMapExample       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB05dcc0ITwKkEM0PomMgtsobDCE2evMHM&libraries=drawing,places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={ <div style={{ height: '100%'}} /> }
            mapElement={ <div style={{ height: '100%' }} /> }
            />
        </div>
   );
   }
};
export default Map;
