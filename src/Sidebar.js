import React from 'react';
import './Sidebar.css'

const Sidebar = (props) => {
  let resultFilter
  const handleChange = (e) => {
    resultFilter = e.target.value;
    props.filterPlaces(resultFilter);
  }


        return (
        <div className="sidebar">
          <select name="placeFilter" id="placeFilter" onChange={handleChange}>
            <option value="none" disabled>Filter</option>
            <option value="coffee">Coffee</option>
            <option value="techno">Techno</option>
            <option value="art">Art</option>
          </select>
          <ul id="places">
            {props.places.filter(pl => pl.type === resultFilter).map(place => <li>{place.fullName}</li>)}
          </ul>
        </div>
        )
    
}

export default Sidebar