import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import latlngDist from "latlng-distance";
import styled from "styled-components";

const DetailsButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #9b9b9b;
  background-color: #d6d8dc;
  width: 50%;
  height: 100%;
  margin: 10px;
  margin-left: 25%;
  padding: 1%;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 1px #ccc;
  @media (max-width: 1024px) {
    width: 40%;
    height: 80%;
  }
`;

const ResourceCardDetail = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
  margin-bottom: 2%;
  color: #9b9b9b;
  width: 90%;
  &:first-child {
    margin-left: 5%;
    color: #323131;
    font-size: 110%;
    font-weight: bold;
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
  @media (max-width: 1024px) {
    height: 250px;
  }
  @media (max-width: 600px) {
    height: 33%;
    width: 80%;
    margin: 5%;
    padding-left: 5%;
  }
`;

const ResourcesNearestYouContainer = styled.div`
  margin: 100px auto;
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto
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
      timeTravel: ""
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
          console.log("item", item);
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
    console.log(newResources);
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(newResources[i]);
    }

    return (
      <ResourcesNearestYouContainer>
        {list.map(item => {
          console.log("item", item);
          if (item && item.name) {
            return (
              <ResourcesNearestYouCard>
                <ResourceCardDetail>{item.name}</ResourceCardDetail>
                <ResourceCardDetail>
                  <i class="fas fa-map-marker-alt" /> {item.address}
                </ResourceCardDetail>
                <ResourceCardDetail>
                  <i class="fas fa-phone" /> {item.phone}
                </ResourceCardDetail>
                <ResourceCardDetail>
                  <i class="fas fa-clock" /> {item.hours}
                </ResourceCardDetail>
                <Link to={`/home/${category}/all/${item.id}`}>
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
  }
};

export default ResourcesNearestYou;
