/*global google*/
import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const GMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB05dcc0ITwKkEM0PomMgtsobDCE2evMHM&libraries=drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }}/>
      }),
      withScriptjs,
      withGoogleMap
    )((props) => (
        <GoogleMap
            defaultCenter = {{ lat: 51.110903, lng: 17.033538 }}
            defaultZoom = { 13 }>
            {props.places.map(loc => (
                <Marker 
                    position={{lat: loc.lat, lng: loc.lng }} 
                    key={loc.name} 
                    type={loc.type} 
                    title={loc.name} 
                    selected={props.selected} 
                    defaultAnimation={google.maps.Animation.DROP} 
                    onClick={() => props.handleClick(loc.name)}
                >
            {props.selected && props.selected === loc.name && 
            <InfoWindow key={loc.name}>
                <div>
                    <p>{loc.name}</p>
                    <img src={loc.photo} alt="Venue"/>
                    <p>{loc.rating}</p>
                    <p>{loc.fsURL}</p>
                    <p>{loc.address}</p>
                </div>
            </InfoWindow>}
                </Marker>))}
        </GoogleMap>
));

class Map extends Component {
    render() {
        return(
        <div className="map">
            <GMap 
                places={this.props.places} 
                selected={this.props.selected} 
                handleClick={this.props.handleClick}
            />
        </div>
        );
    }
};
export default Map;