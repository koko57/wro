import React, { Component } from 'react';
import './App.scss';
import Map from './Map'
// import Sidebar from './Sidebar';
import Header from './Header';
import './Sidebar.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

library.add([faChevronDown, faBars]);





class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      placeFilter: '',
      filtered: [], 
      selected: ''
    }
    this.filterPlaces = this.filterPlaces.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.openInfo = this.openInfo.bind(this);
  }
  componentDidMount() {
    this.setState({places: require('./places.json')});
  }

  filterPlaces(e) {
    this.setState({placeFilter : e.target.value, filtered: this.state.places.filter(pl => pl.type === e.target.value), selected: '' })
  }

  selectMarker(e) {
    !this.state.selected ? this.setState({selected : e.target.id}) : this.setState({selected : ''});
  }
  openInfo(e) {

    !this.state.selected ? this.setState({selected : e}) : this.setState({selected : ''});
  }

  
  render() {
    let spots
    const { placeFilter, places, filtered } = this.state
    placeFilter ? spots = filtered : spots = places;
    return (
      <div className="app">
        <Header />
        <div className="sidebar">
          <select name="placeFilter" id="placeFilter" onChange={this.filterPlaces}>
            <option value="none" disabled>Filter</option>
            <option value="coffee">Coffee</option>
            <option value="techno">Techno</option>
            <option value="art">Art</option>
            <option value="" >All</option>
          </select>
          <FontAwesomeIcon icon="chevron-down"/>
          <ul className="places-list" id="places-list">
            {spots.map(place => <li className="places-list--item" onClick={this.selectMarker} id={place.fullName} key={place.fullName}>{place.fullName}</li>)}
          </ul>
        </div>
        <Map places={spots} placeFilter={this.state.placeFilter} selected={this.state.selected} handleClick={this.openInfo}/>
      </div>
    );
  }
}

export default App;
