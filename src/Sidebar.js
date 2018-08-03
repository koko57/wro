import React from 'react';
import './Sidebar.scss'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

library.add([faChevronDown, faBars]);

const Sidebar = (props) => {
  let resultFilter
  const handleChange = (e) => {
    resultFilter = e.target.value;
    props.filterPlaces(resultFilter);
  }
  

  let {placeFilter, places} = props;
   
        return (
        <div className="sidebar">
          <select name="placeFilter" id="placeFilter" onChange={handleChange}>
            <option value="none" selected disabled>Filter</option>
            <option value="coffee">Coffee</option>
            <option value="techno">Techno</option>
            <option value="art">Art</option>
            <option value="" >All</option>
          </select>
          <FontAwesomeIcon icon="chevron-down" onClick={() => document.getElementById('places-list').setAttribute("display", "block")}/>
          <ul className="places-list" id="places-list">
            {placeFilter ? places.filter(pl => pl.type === placeFilter).map(place => <li className="places-list--item">{place.fullName}</li>) : places.map(place => <li className="places-list--item">{place.fullName}</li>)}
          </ul>
        </div>
        )
    
}

export default Sidebar