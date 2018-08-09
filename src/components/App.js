import React, { Component } from 'react';
import './App.scss';
import Map from './Map';
import Header from './Header';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { getInfo } from '../utils/fsAPI';

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
  //filters places by type, removes marker selection and search query
  filterPlaces(e) {
    this.setState({
      placeFilter: e,
      filtered: this.state.places.filter(pl => pl.type === e),
      selected: '',
      query: ''
    });
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
      const {
        places,
        placeFilter,
        filtered,
        query,
        filteredByName
      } = this.state;

    return (
      <div className="app">
        <Header />
        <div className="main">
          <Sidebar 
          //chooses places which should be passed to the props depending on applied filters 
            places={query ? filteredByName : (placeFilter ? filtered : places)} 
            filterPlaces={this.filterPlaces} 
            filterByName={this.filterByName} 
            selectMarker={this.selectMarker} 
            query={this.state.query}
          />
          <Map 
            places={query ? filteredByName : (placeFilter ? filtered : places)} 
            placesInfo={this.state.placesInfo} 
            selected={this.state.selected} 
            clear={this.clearSelection}
            handleClick={this.openInfo}
          />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  places: PropTypes.array.isRequired, 
  filterPlaces: PropTypes.func.isRequired, 
  filterByName: PropTypes.func.isRequired,
  selectMarker: PropTypes.func.isRequired, 
  query: PropTypes.string
}

Map.propTypes = {
  places: PropTypes.array.isRequired, 
  placesInfo: PropTypes.array.isRequired, 
  selected: PropTypes.string.isRequired,
  clear: PropTypes.func.isRequired, 
  handleClick: PropTypes.func.isRequired
}

export default App;
  









