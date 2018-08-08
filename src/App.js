import React, { Component } from 'react';
import './App.scss';
import Map from './Map';
import Header from './Header';
import Sidebar from './Sidebar';
import escapeRegExp from 'escape-string-regexp';
import { getInfo } from './fsAPI';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      placesInfo: [],
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
    getInfo.then(places =>
      this.setState({ places: places })
    );
  }

  filterPlaces(e) {
    this.setState({
      placeFilter: e,
      filtered: this.state.places.filter(pl => pl.type === e),
      selected: '',
      query: ''
    })
  }

  clearSelection() {
    if (this.state.selected) {
      this.setState({ selected: '' });
    }
  }
  //selects marker and opens infoWindow when clicking place list item
  selectMarker(e) {
    const listItem = e.target.id
    this.state.selected !== listItem ? this.setState({ selected: listItem }) : this.clearSelection();
  }
  //opens infoWindow when clicking a marker
  openInfo(e) {
    const marker = e;
    this.state.selected !== marker ? this.setState({ selected: marker }) : this.clearSelection();
  }
  //filters place list items 
  filterByName(e) {
    const query = e;
    this.setState({ query: query.trim() });
    const match = new RegExp(escapeRegExp(query), 'i')
    let searchedPlace
    this.state.placeFilter ? searchedPlace = this.state.filtered : searchedPlace = this.state.places;
    this.setState({ filteredByName: searchedPlace.filter((pl) => match.test(pl.name)) });
  }

  render() {
    //chooses places which should be passed to the props depending on applied filters 
      let spots
      const {
        places,
        placeFilter,
        filtered,
        query,
        filteredByName
      } = this.state
      placeFilter ? spots = filtered : spots = places;
      query ? spots = filteredByName : spots;
    return (
      <div className="app">
        <Header />
        <div className="main">
          <Sidebar 
            places={spots} 
            filterPlaces={this.filterPlaces} 
            filterByName={this.filterByName} 
            selectMarker={this.selectMarker} 
          />
          <Map 
            places={spots} 
            placesInfo={this.state.placesInfo} 
            placeFilter={this.state.placeFilter} 
            selected={this.state.selected} 
            handleClick={this.openInfo}
          />
        </div>
      </div>
    );
  }
}

export default App;
  









