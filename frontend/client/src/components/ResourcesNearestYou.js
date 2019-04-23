import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import latlngDist from "latlng-distance";
import styled from "styled-components";

const DetailsButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #323131;
  background-color: #d6d8dc;
  width: 50%;
  height: 100%;
  margin: 10px;
  margin-left: 25%;
  padding: 1%;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 1px #888;
  letter-spacing: 1px;
  font-size: 1.2rem;

  @media (max-width: 1024px) {
    width: 63%;
    height: 80%;
    margin: 0 auto;
    padding: 12px 2%;
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
  }
`;

const ResourceCardDetail = styled.div`
  align-items: center;
  margin-left: 5%;
  margin-bottom: 2%;
  color: #9b9b9b;
  width: 90%;
  &:first-child {
    margin-left: 5%;
    color: #323131;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
  @media (max-width: 600px) {
    padding: 10px 0;
  }
`;

const ResourceCardCopy = styled.div`
  margin-left: 25%;
`;

const ResourcesNearestYouCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 30%;
  height: 300px;
  box-shadow: 0px 0px 0px 1px #ccc;
  border-radius: 3px;
  &:hover {
    border: 0.25px solid black;
    box-shadow: 1px 1px 3px 1px #ccc;
  }
  &:hover ${DetailsButton} {
    color: white;
    background-color: #414361;
  }
  &:hover ${ResourceCardDetail} {
    color: #4a4a4a;
  }
  @media (max-width: 600px) {
    width: 90%;
    margin: 5%;
    padding: 30px 3%;
    height: auto;
  }
`;

const ResourcesNearestYouContainer = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  color: #414361;
  margin: 0px 3% 40px 3%;
  width: 100%;
  @media (max-width: 600px) {
    width: 80%;
    margin: 20px 0 10px 0;
    text-align: center;
  }
`;

const ResourcesNearestYou = props => {
  const paths = props.props.location.pathname.split("/");
  let category = paths[2];
  category = category.replace(/\s+/g, "_");

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
      walkingTime: [],
      transitTime: []
    }
  );
  let listOfResources = [];
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

  if (category === "outreach_services") {
    listOfResources = fetcher(
      `https://empact-e511a.firebaseio.com/${category}/_all.json`
    );

    let newResources = [];
    let id = 0;

    for (let i = 0; i < listOfResources.length; i++) {
      const lat = Number(listOfResources[i].latitude);
      const lon = Number(listOfResources[i].longitude);
      const point = { lat, lon };
      const dist = latlngDist.distanceDiffInKm(point, state.currentLocation);
      const resource = Object.assign(listOfResources[i], {
        distance: dist,
        id: id,
        latitude: lat,
        longitude: lon
      });
      newResources.push(resource);
      id++;
    }

    const sortArrayOfObjects = (arr, key) => {
      return arr.sort((a, b) => {
        return a[key] - b[key];
      });
    };

    sortArrayOfObjects(newResources, "distance");
    console.log(newResources);
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(newResources[i]);
    }

    return (
      <ResourcesNearestYouContainer>
        {list.map(item => {
          if (item && item.name) {
            return (
              <ResourcesNearestYouCard>
                <ResourceCardCopy className="copy">
                  <ResourceCardDetail>{item.name}</ResourceCardDetail>
                  <ResourceCardDetail>
                    <i class="fas fa-map-marker-alt" /> {item.address}
                  </ResourceCardDetail>
                  <ResourceCardDetail>
                    <i class="fas fa-phone" />
                    {item.phone}
                  </ResourceCardDetail>
                  <ResourceCardDetail>
                    <i class="fas fa-clock" /> {item.hours}
                  </ResourceCardDetail>
                </ResourceCardCopy>
                <Link to={`/home/${category}/_all/${item.id}`}>
                  <DetailsButton>
                    <i class="fas fa-external-link-alt" /> View Details
                  </DetailsButton>
                </Link>
              </ResourcesNearestYouCard>
            );
          } else {
            return <div>Loading</div>;
          }
        })}
      </ResourcesNearestYouContainer>
    );
  } else {
    listOfResources = fetcher(
      `https://empact-e511a.firebaseio.com/${category}/all.json`
    );
    let newResources = [];
    let id = 0;

    for (let i = 0; i < listOfResources.length; i++) {
      const lat = Number(listOfResources[i].latitude);
      const lon = Number(listOfResources[i].longitude);
      const point = { lat, lon };
      const dist = latlngDist.distanceDiffInKm(point, state.currentLocation);
      const resource = Object.assign(listOfResources[i], {
        distance: dist,
        id: id,
        latitude: lat,
        longitude: lon
      });
      newResources.push(resource);
      id++;
    }

    const sortArrayOfObjects = (arr, key) => {
      return arr.sort((a, b) => {
        return a[key] - b[key];
      });
    };

    sortArrayOfObjects(newResources, "distance");

    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(newResources[i]);
    }

    const firstShelter = list[0];
    const secondShelter = list[1];
    const thirdShelter = list[2];

    const { google } = props;

    if (firstShelter !== undefined) {
      console.log(firstShelter);
      let destinationOne = new google.maps.LatLng(
        firstShelter.latitude,
        firstShelter.longitude
      );

      let destinationTwo = new google.maps.LatLng(
        secondShelter.latitude,
        secondShelter.longitude
      );
      let destinationThree = new google.maps.LatLng(
        thirdShelter.latitude,
        thirdShelter.longitude
      );
      let origin = new google.maps.LatLng(
        state.currentLocation.lat,
        state.currentLocation.lon
      );

      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destinationOne, destinationTwo, destinationThree],
          travelMode: "WALKING",
          unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        callback
      );

      let nextService = new google.maps.DistanceMatrixService();
      nextService.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destinationOne, destinationTwo, destinationThree],
          travelMode: "TRANSIT",
          unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        otherCallback
      );

      async function callback(response, status) {
        console.log(response);
        if (response && response.rows.length) {
          setState({
            walkingTime: [
              response.rows[0].elements[0].duration.text,
              response.rows[0].elements[1].duration.text,
              response.rows[0].elements[2].duration.text
            ]
          });
        }
      }

      async function otherCallback(response, status) {
        console.log("otherCallback", response);
        if (
          response &&
          response.rows.length > 0 &&
          response.rows[0].elements[0].status !== "ZERO_RESULTS" &&
          response.rows[0].elements[1].status !== "ZERO_RESULTS" &&
          response.rows[0].elements[2].status !== "ZERO_RESULTS"
        ) {
          setState({
            transitTime: [
              response.rows[0].elements[0].duration.text,
              response.rows[0].elements[1].duration.text,
              response.rows[0].elements[2].duration.text
            ]
          });
        }
      }
    }

    return (
      <ResourcesNearestYouContainer>
        <Title>RESOURCES NEAR YOU - {category.toUpperCase()}</Title>
        {list.map((item, i) => {
          if (item && item.name) {
            return (
              <ResourcesNearestYouCard className="resource-container">
                <ResourceCardDetail>{item.name}</ResourceCardDetail>
                <ResourceCardDetail>
                  <i class="fas fa-map-marker-alt" /> {item.address}
                </ResourceCardDetail>
                <ResourceCardDetail className="travel-times">
                  <i class="fas fa-bus fa-sm" />
                  {state.transitTime[i]}
                  <i class="fas fa-walking fa-lg" /> {state.walkingTime[i]}
                </ResourceCardDetail>
                <ResourceCardDetail className="travel-times">
                  <i class="fas fa-phone" /> {item.phone}
                  <i class="fas fa-clock" /> {item.hours}
                </ResourceCardDetail>
                <Link to={`/home/${category}/all/${item.id}`}>
                  <DetailsButton className="details-button">
                    <i class="fas fa-external-link-alt" /> VIEW DETAILS
                  </DetailsButton>
                </Link>
              </ResourcesNearestYouCard>
            );
          } else {
            return <div>Loading</div>;
          }
        })}
      </ResourcesNearestYouContainer>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(ResourcesNearestYou);
