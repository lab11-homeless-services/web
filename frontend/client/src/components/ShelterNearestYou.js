import React, { useReducer, useEffect, useState } from "react";
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import latlngDist from "latlng-distance";
import styled from "styled-components";
import ViewDetailsButton from "../components/ViewDetailsButton.js";

const ShelterNearestCard = styled.div`
  border-radius: 2px;
  height: 359px;
  width: 96%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 15% 0 0 5%;
  box-shadow: 1px 2px 8px 1px #00000050;
  padding-right: 2%;
  @media (max-width: 1024px) {
    margin-left: 2%;
    margin-top: -4%;
  }
  @media (max-width: 600px) {
    margin-top: 5%;
    flex-direction: column-reverse;
    height: 620px;
    border: 1px solid black;
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
    margin: 8% 0 0 3%;
  }
  h4 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 5% 0 0 3%;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    h3 {
      margin-left: 3%;
    }
  }
`;

const ShelterAddress = styled.div`
  display: flex;
  margin: 6% 0 0 3%;
  font-size: 0.75rem;
  color: #414361;
  p {
    margin-top: 1%;
  }
`;

const TransportationInfoContainer = styled.div`
  display: flex;
  margin: 5% 0 0 3%;
  color: #414361;
  p {
    margin: 1% 0 0 2%;
    font-size: 0.75rem;
    margin-left: 5%;
  }
`;

const LoadingParagraph = styled.p`
  display: flex;
  margin: 5% 0 0 3%;
  color: #414361;
  p {
    margin: 1% 0 0 2%;
    font-size: 0.75rem;
    margin-left: 5%;
  }
`;

const TransitInfo = styled.div`
  display: flex;
  width: 34%;
  border-right: 1px solid lightgrey;
  p {
    margin-left: 10%;
  }
`;

const WalkingInfo = styled.div`
  display: flex;
  width: 50%;
  margin-left: 4%;
`;

const PhoneHoursContainer = styled.div`
  margin: 5% 0 0 3%;
  display: flex;
  color: #414361;
  p {
    font-size: 0.75rem;
    margin: 2% 0 0 10%;
  }
`;

const PhoneInfo = styled.div`
  width: 34%;
  display: flex;
  border-right: 1px solid lightgrey;
`;

const HoursInfo = styled.div`
  display: flex;
  margin: 0 0 0 4%;
`;

const ShelterInfoButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15% 0 0 3%;
  width: 77%;
  @media (max-width: 1024px) {
    margin-top: 5%;
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (max-width: 600px) {
    margin-bottom: 3%;
    justify-content: space-evenly;
    margin-left: 12%;
    flex-direction: row;
  }
`;

const ViewMapButton = styled.div`
  border: 1px solid lightgrey;
  width: 35%;
  height: 40px;
  margin: 3% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #414361;
  cursor: pointer;
  box-shadow: inset 1px 1px 0px 0px #00000050;
  margin-left: 4%;
  p {
    margin: 0 0 0 7%;
    font-weight: bold;
  }
  @media (max-width: 1024px) {
    margin-top: 3%;
    margin-left: 3%;
  }
  @media (max-width: 600px) {
    margin-bottom: 0;
    margin-left: 3%;
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

// const mapStyles = {
//   map: {

//   }
// };
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

  // const style = Object.assign({}, mapStyles.map);

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
      otherCallback
    );

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
        <MapDiv>
          <MapBox
            // style={style}
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
                <p>{firstShelter.address}</p>
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
                  <p>Transit: {state.transitTime}</p>
                </TransitInfo>
                <WalkingInfo>
                  <i class="fas fa-walking fa-lg" />
                  <p>Walking: {state.walkingTime}</p>
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
                <p>{firstShelter.phone}</p>
              </PhoneInfo>
              <HoursInfo>
                <i class="fas fa-clock" />
                <p>{firstShelter.hours}</p>
              </HoursInfo>
            </PhoneHoursContainer>
          ) : (
            <div>Loading Info</div>
          )}
          <ShelterInfoButtons>
            {newShelters.length > 0 ? (
              <ViewDetailsButton props={newShelters[0].id} />
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
