// importing React/React Hooks/Axios
import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";

// importing Google Maps
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";

// importing latlng-distance for distance matrix
import latlngDist from "latlng-distance";

// importing components
import ViewDetailsButton from "../components/ViewDetailsButton.js";

// styles
import styled from "styled-components";


const ShelterNearestCard = styled.div`
  border-radius: 2px;
  height: 385px;
  width: 96%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 14% 0 0 5%;
  box-shadow: 1px 2px 8px 1px #00000050;
  padding: 0 2% 0 1%;

  @media (max-width: 1024px) {
    margin-left: 2%;
    margin-top: -4%;
  }

  @media (max-width: 600px) {
    margin-top: 5%;
    margin-bottom: 20px;
    flex-direction: column-reverse;
    height: auto;
    padding: 40px 3% 30px 3%;
  }
`;

const ShelterInfoContainer = styled.div`
  width: 65%;
  height: auto;
  display: flex;
  flex-direction: column;

  h3 {
    color: #414361;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 2% 0 0 3%;
    letter-spacing: 1px;
  }

  h4 {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 6% 0 0 3%;
    color: #323131
    letter-spacing: 1px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;

    h3 {
      margin: 0 0 0 3%;
    }
  }
`;

const ShelterAddress = styled.div`
  display: flex;
  margin: 7% 0 0 3%;
  font-size: 0.9rem;
  font-weight: lighter;
  letter-spacing: 1px;

  i {
    color: #414361;
  }

  p {
    margin-top: 1%;
    color: #4a4a4a;
  }
`;

const TransportationInfoContainer = styled.div`
  display: flex;
  margin: 8% 0 0 3%;
  color: #414361;
  letter-spacing: 1px;

  i {
    color: #414361;
  }

  p {
    margin: 1% 0 0 2%;
    font-weight: lighter;
    font-size: 0.9rem;
    margin-left: 5%;
    color: #4a4a4a;
  }
`;

const LoadingParagraph = styled.p`
  display: flex;
  margin: 5% 0 0 3%;
  color: #414361;

  p {
    margin: 1% 0 0 2%;
    font-weight: lighter;
    font-size: 0.9rem;
    margin-left: 5%;
    color: #4a4a4a;
  }
`;

const TransitInfo = styled.div`
  display: flex;
  width: 45%;
  border-right: 1px solid #dfdfdf;

  p {
    margin-left: 8%;
  }
`;

const WalkingInfo = styled.div`
  display: flex;
  width: 50%;
  margin-left: 5%;
`;

const PhoneHoursContainer = styled.div`
  margin: 6% 0 0 3%;
  display: flex;
  letter-spacing: 1px;

  i {
    color: #414361;
  }

  p {
    font-size: 0.9rem;
    font-weight: lighter;
    margin: 2% 0 0 10%;
    color: #4a4a4a;
  }
`;

const PhoneInfo = styled.div`
  width: 43%;
  display: flex;
  align-items: center;
  border-right: 1px solid #dfdfdf;
`;

const HoursInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 4%;
`;

const ShelterInfoButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15% 0 0 3%;
  width: 85%;

  @media (max-width: 1024px) {
    margin-top: 5%;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    justify-content: space-evenly;
    flex-direction: row;
    margin: 40px auto;
  }
`;

const ViewMapButton = styled.div`
  border: 1px solid lightgrey;
  width: 50%;
  height: 40px;
  margin: 3% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: inset 1px 1px 0px 0px #00000050;
  margin-left: 10%;
  letter-spacing: 1px;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;

  &:hover {
    box-shadow: 1px 1px 3px 1px #ccc;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }

  i {
    color: #414361;
  }

  p {
    margin: 0 0 0 7%;
    color: #4a4a4a;
  }

  @media (max-width: 1024px) {
    margin-top: 3%;
    margin-left: 3%;
  }

  @media (max-width: 600px) {
    margin-bottom: 0;
    margin-left: 5%;
    padding: 25px 10%;
    text-align: center;
  }
`;

const MapDiv = styled.div`
  width: 485px;
  height: 85%;

  @media (max-width: 1024px) {
    width: 500px;
    height: 300px;
  }

  @media (max-width: 600px) {
    width: 90%;
    margin-left: 1.5%;
    padding-bottom: 6%;
  }
`;

const SheltersNearestYou = props => {

  // creating state in functional component
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

  // function to get shelter data and set to state
  function fetcher(url) {
    const [data, setData] = useState([]);
    async function getResources() {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
    }

    // getting current position of user
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

  // setting listOfShelters array to shelters in database
  listOfShelters = fetcher(
    `https://empact-e511a.firebaseio.com/shelters/all.json`
  );

  let newShelters = [];
  let id = 0;

  // iterating over listOfShelters and finding distance of shelters from user's
  // current location then pushing results into newShelters array
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

  // function to sort an array
  const sortArrayOfObjects = (arr, key) => {
    return arr.sort((a, b) => {
      return a[key] - b[key];
    });
  };

  // sorting newShelters array by closest distance to user's current location
  sortArrayOfObjects(newShelters, "distance");

  // setting firstShelter to first shelter in sorted newShelters array
  const firstShelter = newShelters[0];
  const { google } = props;

  // setting destination in google maps to firstShelter variable and origin to
  // user's current location
  if (firstShelter !== undefined) {
    let destination = new google.maps.LatLng(
      firstShelter.latitude,
      firstShelter.longitude
    );
    let origin = new google.maps.LatLng(
      state.currentLocation.lat,
      state.currentLocation.lon
    );

    // setting service variable to Google Maps Distance Matrix
    let service = new google.maps.DistanceMatrixService();

    // making call to Google Distance Matrix to get walking time based on user's origin
    // and shelter closest to user
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "WALKING",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      callback
    );

    // making call to Google Distance Matrix to get transit time based on user's origin
    // and shelter closest to user
    let nextService = new google.maps.DistanceMatrixService();
    nextService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "TRANSIT",
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      otherCallback
    );

    // setting resourceLocation on state to firstShelter coordinates and 
    // setting walkingTime on state to Google Distance Matrix results
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

    // setting transitTime on state to Google Distance Matrix results
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

  // opening map with name and address of firstShelter
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
        <MapDiv>
          <MapBox
            apiKey="AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
            opts={{
              center: {
                lat: Number(state.resourceLocation.lat),
                lng: Number(state.resourceLocation.lon)
              },
              zoom: 14
            }}
          />
        </MapDiv>
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
        <ShelterInfoContainer>
          {newShelters.length > 0 ? (
            <div>
              <h3>SHELTER NEAREST TO YOU</h3>
              <h4>{newShelters[0].name}</h4>
              <ShelterAddress>
                <i class="fas fa-map-marker-alt" />
                <p>
                  {firstShelter.address ? firstShelter.address : "Unavailable"}
                </p>
              </ShelterAddress>
            </div>
          ) : (
            <div>Loading Shelters</div>
          )}
          <div>
            {state.walkingTime.length && state.transitTime.length > 0 ? (
              <TransportationInfoContainer>
                <TransitInfo>
                  <i class="fas fa-bus fa-sm" />
                  <p>{state.transitTime ? state.transitTime : "Unavailable"}</p>
                </TransitInfo>
                <WalkingInfo>
                  <i class="fas fa-walking fa-lg" />
                  <p>{state.walkingTime ? state.walkingTime : "Unavailable"}</p>
                </WalkingInfo>
              </TransportationInfoContainer>
            ) : (
              <LoadingParagraph>Travel Time Loading</LoadingParagraph>
            )}
          </div>
          {newShelters.length > 0 ? (
            <PhoneHoursContainer>
              <PhoneInfo>
                <i class="fas fa-phone" />
                <p>{firstShelter.phone ? firstShelter.phone : "Unavailable"}</p>
              </PhoneInfo>
              <HoursInfo>
                <i class="fas fa-clock" />
                <p>{firstShelter.hours ? firstShelter.hours : "Unavailable"}</p>
              </HoursInfo>
            </PhoneHoursContainer>
          ) : (
            <div>Loading Info</div>
          )}
          <ShelterInfoButtons>
            {newShelters.length > 0 ? (
              <ViewDetailsButton
                className="shelter-nearest-button"
                props={newShelters[0].id}
              />
            ) : null}
            <ViewMapButton onClick={() => openMap()}>
              <i class="fas fa-location-arrow fa-lg" />
              <p>View Map</p>
            </ViewMapButton>
          </ShelterInfoButtons>
        </ShelterInfoContainer>
      </GoogleMapProvider>
    </ShelterNearestCard>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SheltersNearestYou);
