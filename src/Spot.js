import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class Spot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infoWindow: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
handleClick() {
    this.setState({infoWindow: !this.state.infoWindow});
}

    render() {
        return(
            <Marker position={this.props.position} key={this.props.key} type={this.props.type} onClick={this.handleClick}>
            {this.state.infoWindow && <InfoWindow><p>{this.props.name}</p></InfoWindow>}
            </Marker>
        )
    }

}

export default Spot