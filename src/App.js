import React, { Component } from 'react';
import './App.scss';
import Map from './Map'
import Sidebar from './Sidebar';
import Header from './Header';




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      places: [],
      placeFilter: ''
    }
    this.filterPlaces = this.filterPlaces.bind(this);
  }
  componentDidMount() {
    this.setState({places: require('./places.json')});
  }
  filterPlaces(e) {
    this.setState({placeFilter : e})
  }
  
  
  render() {
    return (
      <div className="app">
        <Header />
        <Sidebar places={this.state.places} filterPlaces={this.filterPlaces} placeFilter={this.state.placeFilter} onClick={this.click}/>
        <Map places={this.state.places} placeFilter={this.state.placeFilter}/>
      </div>
    );
  }
}

export default App;
