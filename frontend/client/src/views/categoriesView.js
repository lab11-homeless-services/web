import React, {useReducer, useEffect, useContext} from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import ListOfCats from "../components/ListOfCategories";
import ShelterNearestYou from "../components/ShelterNearestYou";
// import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import useFetch from '../functions/useFetch'
import { GoogleMapProvider, InfoWindow, MapBox , Marker, GoogleMapContext} from '@googlemap-react/core'
import latlngDist from 'latlng-distance'
import { GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  map: {
    position: "absolute",
    left: "700px",
    top: "300px",
    width: "40%",
    height: "50%"
  }
};

const CategoriesView = (props) => {
  const [state, setState] = useReducer(
    
    (state, newState) => ({...state, ...newState}),
    {
      currentLocation: {
        lat: 40.785091,
        lon: -73.968285
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      centerAroundCurrentLocation: false,
      visible: true,
      zoom: 14
    }
  )


 
  
  let listOfShelters = []
 
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        
        const coords = pos.coords;
        setState({
          currentLocation: {
            lat: coords.latitude,
            lon: coords.longitude,
          }
        });
      });
      
    }


  listOfShelters = useFetch(`https://empact-e511a.firebaseio.com/shelters/all.json`)
  console.log(listOfShelters)

  const style = Object.assign({}, mapStyles.map);

  let newShelters = []
  let id = 0

  for (let i=0; i < listOfShelters.length; i++) {
    const lat = Number(listOfShelters[i].latitude)
    const lon = Number(listOfShelters[i].longitude)
    const point = {lat, lon}
    console.log('shelter', point)
    console.log('current', state.currentLocation)
    const dist = latlngDist.distanceDiffInKm(point, state.currentLocation )
    console.log('distance', dist)
    const shelter = Object.assign(listOfShelters[i], {distance: dist, id: id, latitude: lat, longitude: lon})
    newShelters.push(shelter)
    id++
  }

  const sortArrayOfObjects = (arr, key) => {
    return arr.sort((a, b) => {
        return a[key] - b[key];
    });
  };

  sortArrayOfObjects(newShelters, "distance");

  const firstShelter = newShelters[0]

  console.log(state.currentLocation)
  const { google } = props;

  
  let travelTime = ''
  if (firstShelter !== undefined) {
    let destination = new google.maps.LatLng(firstShelter.latitude, firstShelter.longitude);
    let origin = new google.maps.LatLng(state.currentLocation.lat, state.currentLocation.lon);
    console.log('coordinates', destination, origin)
  
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.IMPERIAL
    },
      callback
    );
    async function callback(response, status) {
        // See Parsing the Results for
        // the basics of a callback function.
    console.log(response)
    console.log(response.rows[0].elements[0].duration.text);
    travelTime = response.rows[0].elements[0].duration.text
    await window.localStorage.setItem('time', travelTime)
    }
  }

  

  const time = window.localStorage.getItem('time')
  
  return(
    <GoogleMapProvider>
    <div>
        <div>
          <div style={style}>
            Loading map...
          </div>
        </div>
        <Header />
        <ListOfCats />
      </div>
      <MapBox
      style={style}
      apiKey="AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
      opts={{
        center: {lat: state.currentLocation.lat, lng: state.currentLocation.lon},
        zoom: 14,
      }}
    />
    {travelTime.length > 0 ? <div>{travelTime}</div> : 'Travel Time Loading'}
    {newShelters.length > 0 ? <div>
      <p>{time}</p>
      <p>Closest Shelter</p>
      <p>{newShelters[0].name}</p>
    </div> : <div>Loading Shelters</div> }
    
    </GoogleMapProvider>
  )
  }
  
  export default GoogleApiWrapper({
    apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
  })(CategoriesView)
  

