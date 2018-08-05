import React, { Component } from 'react';
import './App.scss';
import Map from './Map'
import Header from './Header';
import escapeRegExp from 'escape-string-regexp'
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
      filteredByName: [],
      selected: '', 
      query: ''
    }
    this.filterPlaces = this.filterPlaces.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
    this.openInfo = this.openInfo.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.handleChange =  this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({places: require('./places.json')});
  }

  filterPlaces(e) {
    this.setState({placeFilter : e.target.value, filtered: this.state.places.filter(pl => pl.type === e.target.value), selected: '', query: '' })
  }
  clearSelection() {
    if (this.state.selected) {
      this.setState({selected: ''});
    }
  }
  selectMarker(e) {
    this.state.selected !== e.target.id ? this.setState({selected : e.target.id}) : this.clearSelection();
  }
  openInfo(e) {
    this.state.selected !== e ? this.setState({selected : e}) : this.clearSelection();
  }
  handleChange(e) {
    const query = e.target.value
    this.setState({
        query: query.trim()
    });
    const match = new RegExp(escapeRegExp(query), 'i')
    let searchedPlace
    this.state.placeFilter ? searchedPlace = this.state.filtered : searchedPlace = this.state.places;
    this.setState({filteredByName: searchedPlace.filter((pl) => match.test(pl.fullName))});
  }

  render() {
    let spots
    const { placeFilter, places, filtered, query, filteredByName } = this.state
    placeFilter ? spots = filtered : spots = places;
    query ? spots = filteredByName : spots


    return (
      <div className="app">
        <Header />
        <div className="sidebar">
        <input type="text" name="searchByName" id="search" placeholder="Search By Name" onChange={this.handleChange}/>
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
