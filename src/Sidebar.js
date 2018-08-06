import React from 'react';
import './Sidebar.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

library.add([faChevronDown, faBars]);

const Sidebar = (props) => {
  
  const select = (e) => {
    props.filterPlaces(e.target.value);
  }
  const search = (e) => {
    props.filterByName(e.target.value)
  }
        return (
          <div className="sidebar">
          <input type="text" name="searchByName" id="search" placeholder="Search By Name" onChange={search}/>
            <select name="placeFilter" id="placeFilter" onChange={select}>
              <option value="none" disabled>Filter</option>
              <option value="coffee">Coffee</option>
              <option value="techno">Techno</option>
              <option value="art">Art</option>
              <option value="" >All</option>
            </select>
            <FontAwesomeIcon icon="chevron-down"/>
            <ul className="places-list" id="places-list">
              {props.places.map(place => <li className="places-list--item" onClick={props.selectMarker} id={place.name} key={place.name}>{place.name}</li>)}
            </ul>
          </div>
        )
    
}

export default Sidebar