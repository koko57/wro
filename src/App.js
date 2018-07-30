import React, { Component } from 'react';
import './App.css';
import Map from './Map'
import Sidebar from './Sidebar';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [{
        fullName: 'Bema Cafe',
        lat: 51.1182005,
        lng: 17.0400579,
        type: 'break'
      }, {
        fullName: 'Gniazdo',
        lat: 51.105362,
        lng: 17.0315874,
        type: 'coffee'
      }, {
        fullName: 'Paloma',
        lat: 51.1094935,
        lng: 17.028659,
        type: 'coffee'
      }, {
        fullName: 'Etno Okrąglak',
        lat: 51.10238529999999,
        lng: 17.0300293,
        type: 'coffee'
      }]
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Sidebar places={this.state.places} />
        <Map places={this.state.places}/>
      </div>
    );
  }
}

export default App;
