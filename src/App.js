import React, { Component } from 'react';
import './App.scss';
import Map from './Map';
import Header from './Header';
import Sidebar from './Sidebar';
import escapeRegExp from 'escape-string-regexp';
import { library } from '@fortawesome/fontawesome-svg-core';
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
    this.filterByName = this.filterByName.bind(this);
  }
  componentDidMount() {
    this.setState({
      places: require('./places.json')
    });
  }
  filterPlaces(e) {
    this.setState({
      placeFilter: e,
      filtered: this.state.places.filter(pl => pl.type === e),
      selected: '',
      query: ''
    })
    console.log(e)
  }

  clearSelection() {
    if (this.state.selected) {
      this.setState({
        selected: ''
      });
    }
  }
  selectMarker(e) {
    this.state.selected !== e.target.id ? this.setState({
      selected: e.target.id
    }) : this.clearSelection();
  }
  openInfo(e) {
    this.state.selected !== e ? this.setState({
      selected: e
    }) : this.clearSelection();
  }
  filterByName(e) {
    const query = e
    this.setState({
      query: query.trim()
    });
    const match = new RegExp(escapeRegExp(query), 'i')
    let searchedPlace
    this.state.placeFilter ? searchedPlace = this.state.filtered : searchedPlace = this.state.places;
    this.setState({
      filteredByName: searchedPlace.filter((pl) => match.test(pl.fullName))
    });
  }

  render() {
    let spots
    const {
      placeFilter,
      places,
      filtered,
      query,
      filteredByName
    } = this.state
    placeFilter ? spots = filtered : spots = places;
    query ? spots = filteredByName : spots

    return (
      <div className="app">
        <Header />
        <Sidebar places={spots} filterPlaces={this.filterPlaces} filterByName={this.filterByName} selectMarker={this.selectMarker}/>
        <Map places={spots} placeFilter={this.state.placeFilter} selected={this.state.selected} handleClick={this.openInfo}/>
      </div>
    );
  }
}

export default App;
  