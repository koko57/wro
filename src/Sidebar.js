import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {
    render() {
        return (
        <div className="sidebar">
          <input type="text" name="search" id="searchLoc" placeholder="Search location"/>
          <select name="" id="">
            <option value="none" disabled>Filter</option>
            <option value="coffee">Coffee</option>
            <option value="techno">Techno</option>
          </select>
          <ul id="places">
            {this.props.places.map(place => <li>{place.fullName}</li>)}
          </ul>
        </div>
        )
    }
}

export default Sidebar