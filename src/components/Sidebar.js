import React from 'react';
import './Sidebar.scss';

export const Sidebar = (props) => {
    // Passes the select menu value as an argument to the function which filters places by type.
    const select = (e) => {
        props.filterPlaces(e.target.value);
    }

    // Passes the input's value as an argument to the function which filters places by name.
    const search = (e) => {
        props.filterByName(e.target.value);
    }

    return (
        <div className="sidebar">
            <div id="search-filter-bar" className="search-filter-bar" role="menubar">
                <input type="text" id="search" role="search" placeholder="Search By Name" value={props.query} onChange={search}/>
                <select name="placeFilter" id="placeFilter" onChange={select}>
                    <option value="">All</option>
                    <option value="coffee">Coffee spots</option>
                    <option value="techno">Techno venues</option>
                    <option value="art">Museums</option>
                </select>
            </div>
            <div className="places-list-container">
                <ul className="places-list" id="places-list" role="listbox">
                    {props.places.map(place =>
                        <li className="places-list--item" onClick={props.selectMarker} id={place.name} key={place.name}>
                        {/* clicking the button opens the infoWindow of linked marker */}
                        <button onClick={props.selectMarker} id={place.name}>{place.name}</button>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}
