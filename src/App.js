import React, { Component } from 'react';
import './App.scss';
import Map from './Map';
import Header from './Header';
import Sidebar from './Sidebar';
import escapeRegExp from 'escape-string-regexp';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

library.add([faChevronDown, faBars]);

const fUrl = 'https://api.foursquare.com/v2/venues/';
const clientId = '3O5GTSKBYIUIKVBC4ZNKNLZT5DIJNJGVQANHDOC4QAQLOCEV';
const clientSecret = 'N1HMOWZA3ZVE3GNIK2M4TDHS2IPVFWTS4G5P5LNMMBVYWJOU';
const auth = `&client_id=${clientId}&client_secret=${clientSecret}&v=20180806`;

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
    const places = require('./places.json');

    let promise = new Promise((resolve, reject) => {
      places.forEach(pl => fetch(`${fUrl}search?ll=${pl.lat},${pl.lng}${auth}&intent=match&query=${pl.name}`)
        .then(res => res.json())
        .then(data => pl.id = data.response.venues[0].id)
        .then(id => fetch(`${fUrl}${id}?${auth}`)
          .then(res => res.json())
          .then(data => {
            pl.address = data.response.venue.location.formattedAddress;
            pl.rating = data.response.venue.rating;
            pl.fsURL = data.response.venue.canonicalUrl;
            pl.photo = data.response.venue.bestPhoto.prefix + "100x100" + data.response.venue.bestPhoto.suffix;
          }))
        .catch(err => {
          console.log(err, 'Loading error');
        }));
      resolve(places)
      reject(new Error('Something went wrong!'))
    });

    promise.then(places =>
      this.setState({
        places: places
      }));
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
      filteredByName: searchedPlace.filter((pl) => match.test(pl.name))
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
        <Map places={spots} placesInfo={this.state.placesInfo} placeFilter={this.state.placeFilter} selected={this.state.selected} handleClick={this.openInfo}/>
      </div>
    );
  }
}

export default App;
  