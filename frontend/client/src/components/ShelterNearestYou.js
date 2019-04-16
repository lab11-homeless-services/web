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
import ViewDetailsButton from "../components/ViewDetailsButton.js";
import { Link } from "react-router-dom";

const ShelterNearestCard = styled.div`
  border-radius: 2px;
  height: 63%;
  width: 800px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 12% 0 0 4%;
  box-shadow: 1px 2px 4px 2px #00000050;
`;

const Info = styled.div`
  width: 40%;
`;

const mapStyles = {
  map: {
    width: "500px",
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
      walkingTime: "",
      transitTime: ""
    }
  );
  let listOfShelters = [];
  function fetcher(url) {
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

  listOfShelters = fetcher(
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
        travelMode: "WALKING",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      callback
    );
    
    let nextService = new google.maps.DistanceMatrixService();
    nextService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "TRANSIT",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      otherCallback);

    async function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function..

      if (response && response.rows.length) {
        setState({
          resourceLocation: {
            lat: firstShelter.latitude,
            lon: firstShelter.longitude
          },
          walkingTime: response.rows[0].elements[0].duration.text
        });
      }
    }

    async function otherCallback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function..

      if (
        response &&
        response.rows.length > 0 &&
        response.rows[0].elements[0].status !== "ZERO_RESULTS"
      ) {
        setState({
          transitTime: response.rows[0].elements[0].duration.text
        });
      }
    }
  }

  const openMap = e => {
    const name = firstShelter.name.split(" ").join("+");
    const address = firstShelter.address.split(" ").join("+");

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${name}+${address}`
    );
  };

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
              lat: Number(state.resourceLocation.lat),
              lng: Number(state.resourceLocation.lon)
            },
            zoom: 14
          }}
        />
        <InfoWindow
          anchorId="marker"
          opts={{
            content: newShelters.length > 0 ? newShelters[0].name : null,
            position: {
              lat: Number(state.resourceLocation.lat),
              lng: Number(state.resourceLocation.lon)
            }
          }}
          visible
        />
        <Marker
          id="marker"
          opts={{
            position: {
              lat: Number(state.resourceLocation.lat),
              lng: Number(state.resourceLocation.lon)
            }
          }}
        />
        <Info>
          {newShelters.length > 0 ? (
            <div>
              <p>SHELTER NEAREST TO YOU</p>
              <p>{newShelters[0].name}</p>
              <p>{firstShelter.address}</p>
            </div>
          ) : (
            <div>Loading Shelters</div>
          )}
          <div>
            {state.walkingTime.length && state.transitTime.length > 0 ? (
              <div>
                <div>Walking: {state.walkingTime}</div>
                <div>Transit: {state.transitTime}</div>
              </div>
            ) : (
              "Travel Time Loading"
            )}
          </div>
          {newShelters.length > 0 ? (
            <div>
              <p>{firstShelter.phone}</p>
              <p>{firstShelter.hours}</p>
            </div>
          ) : (
            <div>Loading Info</div>
          )}
          {newShelters.length > 0 ? (
            <ViewDetailsButton props={newShelters[0].id} />
          ) : null}
          <div onClick={() => openMap()}>View Map</div>
        </Info>
      </GoogleMapProvider>
    </ShelterNearestCard>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SheltersNearestYou);
