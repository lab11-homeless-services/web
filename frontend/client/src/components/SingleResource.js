import React, { useReducer, useEffect, useState } from "react";
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import styled from "styled-components";

const SingleResourceCard = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  height: 400px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-left: 0%;
  width: 100%;
`;

const Info = styled.div`
  width: 40%;
  border: 1px solid green;
`;

const DetailsServices = styled.div`
  border: 1px solid red;
  width: 30%;
`;

const mapStyles = {
  map: {
    width: "500px",
    height: "75%"
  }
};

const SingleResource = props => {
  console.log("SR props", props);
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
      transitTime: "",
      showingDetails: true,
      showingServices: false
    }
  );

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

  //Splits path name at backslash
  const paths = props.props.location.pathname.split("/");

  //Accesses each piece of the pathname from the array createdabove
  let category = paths[2];
  category = category.replace(/\s+/g, "_");
  const subCat = paths[3];
  const singleResource = paths[4];

  const resource = fetcher(
    `https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`
  );

  const style = Object.assign({}, mapStyles.map);

  const { google } = props;

  if (resource !== undefined) {
    let destination = new google.maps.LatLng(
      resource.latitude,
      resource.longitude
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

      if (
        response &&
        response.rows.length > 0 &&
        response.rows[0].elements[0].status !== "ZERO_RESULTS"
      ) {
        console.log("res", resource);
        setState({
          resourceLocation: {
            lat: Number(resource.latitude),
            lon: Number(resource.longitude)
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
    const name = resource.name.split(" ").join("+");
    const address = resource.address.split(" ").join("+");

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${name}+${address}`
    );
  };

  const showServices = e => {
    e.preventDefault();
    setState({
      ...state,
      showingDetails: false,
      showingServices: true
    });
  };

  const showDetails = e => {
    e.preventDefault();
    setState({
      ...state,
      showingDetails: true,
      showingServices: false
    });
  };

  return (
    <SingleResourceCard>
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
        <InfoWindow
          anchorId="marker"
          opts={{
            content: resource ? resource.name : null,
            position: {
              lat: state.resourceLocation.lat,
              lng: state.resourceLocation.lon
            }
          }}
          visible
        />
        <Marker
          id="marker"
          opts={{
            position: {
              lat: state.resourceLocation.lat,
              lng: state.resourceLocation.lon
            }
          }}
        />
        <div>
          <Info>
            <p>{resource.name}</p>
            <p>{resource.address}</p>
            <p>{resource.city}</p>
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
            <div onClick={() => openMap()}>View Map</div>
          </Info>
          {resource.details && resource.services ? (
            <DetailsServices>
              <h4 onClick={showDetails}>Details</h4>
              {state.showingDetails === true
                ? resource.details.map(detail => <p>{detail}</p>)
                : null}
              <h4 onClick={showServices}>Services</h4>
              {state.showingServices === true
                ? resource.services.map(service => <p>{service}</p>)
                : null}
            </DetailsServices>
          ) : null}
        </div>
      </GoogleMapProvider>
    </SingleResourceCard>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SingleResource);
