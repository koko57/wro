# WrocFavs - my favourite places in Wroclaw

## Table of Contents

* [About the App](#abouttheapp)
* [Getting started](#gettingstarted)
* [Tools used in this project](#toolsusedinthisproject)
* [Note about the Service Worker](#noteabouttheserviceworker)


## About the App
This is the last, fifth project of the Udacity FEND program. The app using Google Maps shows my favourite locations in Wroclaw PL. The places can be filtered by location type (coffee spots, techno venues, museums) or by name.
Clicking the marker opens the InfoWindow which provides some basic info about each place and displays venue's "best photo" (according to Foursquare).

## Getting started

Clone this repo, then
* install all project dependencies with `npm install`
* start the server with `npm start`

Live preview: (https://koko57.github.io/wrocfavs/)

## Tools used in this project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### APIs
* Google Maps API 
* Foursquare API

### npm packages 
* react-google-maps
* recompose
* sass-loader 
* node-sass
* prop-types
* escape-string-regexp

### Styling elements
Marker icons and favicon created with vectr.com
Google Fonts: Josefin Sans and Quicksand

## Note about the Service Worker
The service Worker provided by create-react-app works only in production build.
to run the app in production build follow these steps:
* run following commands in the terminal/command line:
   `npm run build`
   `serve -s build`
* open `localhost 500` in your browser.