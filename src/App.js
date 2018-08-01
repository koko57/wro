import React, { Component } from 'react';
import './App.css';
import './responsive.scss';
import Map from './Map'
import Sidebar from './Sidebar';
import Header from './Header';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: require('./places.json'),
      placeFilter: ''
    }
    this.filterPlaces = this.filterPlaces.bind(this);
  }

  filterPlaces(e) {
    this.setState({placeFilter : e})
  }
  
  render() {
    return (
      <div className="app">
        <Header />
        <Sidebar places={this.state.places} filterPlaces={this.filterPlaces}/>
        <Map places={this.state.places} placeFilter={this.state.placeFilter}/>
      </div>
    );
  }
}

export default App;
