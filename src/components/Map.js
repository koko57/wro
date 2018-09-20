/* global google */
import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import './Map.scss';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

// Images for selected and unselected markers.
const selected = 'https://vectr.com/koko57/b3Zv7Wgrtj.svg?width=33&height=50&select=b3Zv7Wgrtjpage0';
const unselected = 'https://vectr.com/koko57/f150I6xd8A.svg?width=30&height=45&select=f150I6xd8Apage0';

const GMap = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAV7fdobyXF7j4zxbq5S71P6efvsfx54nA&libraries=drawing,places',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%' }} />,
        mapElement: <div style={{ height: '100%' }}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap
        defaultCenter={{ lat: 51.110903, lng: 17.033538 }}
        defaultZoom={13}
    >
        {props.places.map(loc => (
            <Marker
                position={{ lat: loc.lat, lng: loc.lng }}
                key={loc.name}
                type={loc.type}
                icon={props.selected === loc.name ? selected : unselected}
                selected={props.selected}
                animation={google.maps.Animation.DROP}
                onClick={() => props.handleClick(loc.name)}
            >
                {props.selected && props.selected === loc.name &&
                <InfoWindow key={loc.name} onCloseClick={props.clear}>
                    <div className="infoWindow">
                    <h3>{loc.name}</h3>
                    {loc.photo && <img src={loc.photo} alt="Venue"/> }
                    {loc.address && <p>{loc.address}</p>}
                    {loc.venueType && <p>{loc.venueType}</p>}
                    {loc.rating ? <p>Rating: {loc.rating}</p> : <p>No rating yet.</p>}
                    {loc.fsURL && <a href={loc.fsURL}>View on Foursquare</a>}
                    {(!loc.address || !loc.venueType || !loc.fsURL) &&
                    <p>Sorry, we couldn't load more info.</p>}
                    </div>
                </InfoWindow>}
            </Marker>
        ))}
    </GoogleMap>
));

export default class Map extends Component {
    render() {
        return (
            <div className="map">
                <GMap
                    places={this.props.places}
                    selected={this.props.selected}
                    handleClick={this.props.handleClick}
                    clear={this.props.clear}
                />
            </div>
        );
    }
}

GMap.propTypes = {
    places: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};
