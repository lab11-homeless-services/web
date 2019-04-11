import React, { useReducer, useEffect, useContext, useState } from "react";
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker,
  GoogleMapContext
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import latlngDist from "latlng-distance";
import styled from "styled-components";

const ShelterNearestCard = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  height: 400px;
  width: 500px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
`;

const mapStyles = {
  map: {
    // left: "500px",
    // top: "200px",
    width: "40%",
    height: "75%"
  }
};

const SheltersNearestYou = props => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      currentLocation: {
        lat: 40.785091,
        lon: -73.968285
      },
      resourceLocation: {
        lat: "",
        lon: ""
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      centerAroundCurrentLocation: false,
      visible: true,
      zoom: 14,
      timeTravel: ""
    }
  );
  let listOfShelters = [];
  function fether(url) {
    const [data, setData] = useState([]);
    async function getResources() {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
    }
    useEffect(() => {
      getResources();
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          setState({
            currentLocation: {
              lat: coords.latitude,
              lon: coords.longitude
            }
          });
        });
      }
    }, []);
    return data;
  }

  listOfShelters = fether(
    `https://empact-e511a.firebaseio.com/shelters/all.json`
  );

  const style = Object.assign({}, mapStyles.map);

  let newShelters = [];
  let id = 0;

  for (let i = 0; i < listOfShelters.length; i++) {
    const lat = Number(listOfShelters[i].latitude);
    const lon = Number(listOfShelters[i].longitude);
    const point = { lat, lon };
    const dist = latlngDist.distanceDiffInKm(point, state.currentLocation);
    const shelter = Object.assign(listOfShelters[i], {
      distance: dist,
      id: id,
      latitude: lat,
      longitude: lon
    });
    newShelters.push(shelter);
    id++;
  }

  const sortArrayOfObjects = (arr, key) => {
    return arr.sort((a, b) => {
      return a[key] - b[key];
    });
  };

  sortArrayOfObjects(newShelters, "distance");

  const firstShelter = newShelters[0];
  const { google } = props;

  let travelTime = "";
  if (firstShelter !== undefined) {
    let destination = new google.maps.LatLng(
      firstShelter.latitude,
      firstShelter.longitude
    );
    let origin = new google.maps.LatLng(
      state.currentLocation.lat,
      state.currentLocation.lon
    );

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
      // the basics of a callback function..

      if (response && response.rows.length) {
        console.log(response.destinationAddresses);
        setState({
          timeTravel: response.rows[0].elements[0].duration.text,
          resourceLocation: {
            lat: firstShelter.latitude,
            lon: firstShelter.longitude
          }
        });
      }
    }
  }

  return (
    <ShelterNearestCard>
      <GoogleMapProvider>
        {/* <div>
          <div>
            <div style={style}>Loading map...</div>
          </div>
        </div> */}
        <MapBox
          style={style}
          apiKey="AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
          opts={{
            center: {
              lat: state.resourceLocation.lat,
              lng: state.resourceLocation.lon
            },
            zoom: 14
          }}
        />
        <div>
          {state.timeTravel.length > 0 ? (
            <div>{state.timeTravel}</div>
          ) : (
            "Travel Time Loading"
          )}
          {newShelters.length > 0 ? (
            <div>
              <p>Closest Shelter</p>
              <p>{newShelters[0].name}</p>
            </div>
          ) : (
            <div>Loading Shelters</div>
          )}
        </div>
      </GoogleMapProvider>
    </ShelterNearestCard>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SheltersNearestYou);
