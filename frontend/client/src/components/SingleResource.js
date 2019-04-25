import React, { useReducer, useEffect, useState } from "react";

import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SingleResourceCard = styled.div`
  border-radius: 3px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 100px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  border: 0.25px solid black;
  box-shadow: 1px 1px 3px 1px #ccc;
  border-radius: 3px;
  padding: 2%;

  @media (max-width: 600px) {
    margin-bottom: 20px;
    margin-top: 40px;
  }

  @media print {
    margin-top: -200px;
  }
`;

const Info = styled.div`
  height: 400px;
  width: 32%;
  color: #4a4a4a;
  padding-top: 45px;

  @media (max-width: 1024px) {
    width: 50%;
    padding-left: 4%;
    height: 326px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #323131
  padding-bottom: 31px;
  letter-spacing: 1px;
`;

const DetailsServices = styled.div`
  height: 361px;
  width: 32%;
  padding-top: 31px;
  margin-right: 3%;

  @media (max-width: 1024px) {
    width: 45%;
    padding-top: 45px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    height: auto;
    width: 100%;
    padding: 50px 4% 0 4%;
  }
`;

const DetailsTitles = styled.div`
  display: flex;
  padding-bottom: 7px;
`;

const PrintButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  background-color: #414361;
  border-radius: 3px;
  box-shadow: 0px 1px 3px 1px #ccc;
  padding: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  width: 120px;
  cursor: pointer;
  letter-spacing: 2px;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 1px 2px 4px 2px #00000050;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const PreviousButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #4a4a4a;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 1.2rem;
  width: 200px;
  cursor: pointer;
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

  @media (max-width: 600px) {
    margin: 20px 4%;
    padding: 20px 10px;
    width: 92%;
    justify-content: center;
  }

  @media print {
    display: none;
  }
`;

const ViewMap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #4a4a4a;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 5%;
  font-size: 1.2rem;
  width: 145px;
  cursor: pointer;
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

  @media (max-width: 600px) {
    width: 92%;
    justify-content: center;
    padding: 20px 10px;
  }

  @media print {
    display: none;
  }
`;

const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    padding: 40px 45px 40px 37px;
  }
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 0;
  }
`;

const InfoText = styled.div`
  padding-bottom: 30px;
`;

const ServiceButton = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #414361;
  border-radius: 2px;
  cursor: pointer;
  background: ${state =>
    state.showingServices === true ? "#414361" : "#d0d2d6"};
  color: ${state => (state.showingServices === true ? "#fff" : "#4a4a4a")};
`;

const DetailsButton = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #414361;
  border-radius: 2px;
  cursor: pointer;
  background: ${state =>
    state.showingDetails === true ? "#414361" : "#d0d2d6"};
  color: ${state => (state.showingDetails === true ? "#fff" : "#4a4a4a")};
`;

const ServiceList = styled.div`
  display: flex;
  margin: 7px 0;
  color: #4a4a4a;
  align-items: center;
  padding: 5px 0;
`;

const ListNumber = styled.div`
  padding: 8px 15px;
  background: #656176
  color: white;
`;
const ListText = styled.div`
  background: #f3f3f5;
  padding: 8px 2%;
  width: 100%;
`;

const SingleResource = props => {
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
    }, [url]);
    return data;
  }

  //Splits path name at backslash
  const paths = props.props.location.pathname.split("/");

  //Accesses each piece of the pathname from the array createdabove
  let category = paths[2];
  category = category.replace(/\s+/g, "_");
  const subCat = paths[3];
  const singleResource = paths[4];

  if (category !== "outreach_services") {
    const resource = fetcher(
      `https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`
    );

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
        if (
          response &&
          response.rows.length > 0 &&
          response.rows[0].elements[0].status !== "ZERO_RESULTS"
        ) {
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

    const printPage = e => {
      window.print();
    };

    const showServices = e => {
      e.preventDefault();
      setState({
        ...state,
        showingDetails: false,
        showingServices: true,
        active: true,
        inactive: false
      });
    };

    const showDetails = e => {
      e.preventDefault();
      setState({
        ...state,
        showingDetails: true,
        showingServices: false,
        active: true,
        inactive: false
      });
    };

    return (
      <SingleResourceCard>
        <GoogleMapProvider>
          <Info>
            <Title>{resource.name}</Title>
            <InfoText>
              <i className="fas fa-map-marker-alt" />
              {resource.address ? resource.address : "Unavailable"}
            </InfoText>

            <div className="travel-time">
                <InfoText>
                  <i className="fas fa-bus" />
                  {state.transitTime ? state.transitTime : "Unavailable"}
                  <i class="fas fa-walking" /> 
                  {state.walkingTime ? state.walkingTime : "Unavailable"} 
                </InfoText>
            </div>
            <div className="info-hours">
              <InfoText>
                <i class="fas fa-phone" />
                {resource.phone ? resource.phone : "Unavailable"}
                <i class="fas fa-clock" />
                {resource.hours ? resource.hours : "Unavailable"}
              </InfoText>
            </div>
            <div className="map-button">
              <ViewMap onClick={() => openMap()}>
                <i className="fas fa-location-arrow" />
                View Map
              </ViewMap>
            </div>
          </Info>
          {resource.details && resource.services ? (
            <DetailsServices>
              <DetailsTitles>
                <ServiceButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showServices}
                >
                  Services
                </ServiceButton>
                <DetailsButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showDetails}
                >
                  Details
                </DetailsButton>
              </DetailsTitles>
              {state.showingDetails === true
                ? resource.details.map((detail, i) => (
                    <ServiceList>
                      <ListNumber>{i + 1}</ListNumber>
                      <ListText>{detail}</ListText>
                    </ServiceList>
                  ))
                : null}
              {state.showingServices === true
                ? resource.services.map((service, i) => (
                    <ServiceList>
                      <ListNumber>{i + 1}</ListNumber>
                      <ListText>{service}</ListText>
                    </ServiceList>
                  ))
                : null}
            </DetailsServices>
          ) : (
            <DetailsServices>
              <DetailsTitles>
                <ServiceButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showServices}
                >
                  Services
                </ServiceButton>
                <DetailsButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showDetails}
                >
                  Details
                </DetailsButton>
              </DetailsTitles>
              {state.showingDetails === true ? (
                <ServiceList>
                  <ListNumber>{1}</ListNumber>
                  <ListText>No details to display</ListText>
                </ServiceList>
              ) : null}
              {state.showingServices === true ? (
                <ServiceList>
                  <ListNumber>1</ListNumber>
                  <ListText>No services to display</ListText>
                </ServiceList>
              ) : null}
            </DetailsServices>
          )}
          <div className="maps">
            <MapBox
              apiKey="AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
              className="map-box"
              opts={{
                center: {
                  lat: state.resourceLocation.lat,
                  lng: state.resourceLocation.lon
                },
                zoom: 14
              }}
            />
          </div>
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
          <ButtonsDiv className="button-div">
            <NavLink to={`/home/${category}`}>
              <div className="previous-button">
                <PreviousButton>
                  <i className="fas fa-arrow-left" />
                  Previous Page
                </PreviousButton>
              </div>
            </NavLink>
            <PrintButton onClick={() => printPage()}>
              <i className="fas fa-print" />
              PRINT
            </PrintButton>
          </ButtonsDiv>
        </GoogleMapProvider>
      </SingleResourceCard>
    );
  } else {
    const resource = fetcher(
      `https://empact-e511a.firebaseio.com/${category}/_all/${singleResource}.json`
    );
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
        if (
          response &&
          response.rows.length > 0 &&
          response.rows[0].elements[0].status !== "ZERO_RESULTS"
        ) {
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

    const printPage = e => {
      window.print();
    };

    const showServices = e => {
      e.preventDefault();
      setState({
        ...state,
        showingDetails: false,
        showingServices: true,
        active: true,
        inactive: false
      });
    };

    const showDetails = e => {
      e.preventDefault();
      setState({
        ...state,
        showingDetails: true,
        showingServices: false,
        active: true,
        inactive: false
      });
    };

    return (
      <SingleResourceCard>
        <GoogleMapProvider>
          <Info>
            <Title>{resource.name}</Title>
            <InfoText>
              <i className="fas fa-map-marker-alt" />
              {resource.address ? resource.address : "Unavailable"}
            </InfoText>

            <div className="travel-time">
                <InfoText>
                  <i className="fas fa-bus" />
                  {state.transitTime ? state.transitTime : "Unavailable"}
                  <i class="fas fa-walking" /> 
                  {state.walkingTime ? state.walkingTime : "Unavailable"}
                </InfoText>
            </div>
            <div className="info-hours">
              <InfoText>
                <i class="fas fa-phone" />
                {resource.phone ? resource.phone : "Unavailable"}
                <i class="fas fa-clock" />
                {resource.hours ? resource.hours : "Unavailable"}
              </InfoText>
            </div>
            <div className="map-button">
              <ViewMap onClick={() => openMap()}>
                <i className="fas fa-location-arrow" />
                View Map
              </ViewMap>
            </div>
          </Info>
          {resource.details && resource.services ? (
            <DetailsServices>
              <DetailsTitles>
                <ServiceButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showServices}
                >
                  Services
                </ServiceButton>
                <DetailsButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showDetails}
                >
                  Details
                </DetailsButton>
              </DetailsTitles>
              {state.showingDetails === true
                ? resource.details.map((detail, i) => (
                    <ServiceList>
                      <ListNumber>{i + 1}</ListNumber>
                      <ListText>{detail}</ListText>
                    </ServiceList>
                  ))
                : null}
              {state.showingServices === true
                ? resource.services.map((service, i) => (
                    <ServiceList>
                      <ListNumber>{i + 1}</ListNumber>
                      <ListText>{service}</ListText>
                    </ServiceList>
                  ))
                : null}
            </DetailsServices>
          ) : (
            <DetailsServices>
              <DetailsTitles>
                <ServiceButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showServices}
                >
                  Services
                </ServiceButton>
                <DetailsButton
                  showingDetails={state.showingDetails}
                  showingServices={state.showingServices}
                  onClick={showDetails}
                >
                  Details
                </DetailsButton>
              </DetailsTitles>
              {state.showingDetails === true ? (
                <ServiceList>
                  <ListNumber>{1}</ListNumber>
                  <ListText>No details to display</ListText>
                </ServiceList>
              ) : null}
              {state.showingServices === true ? (
                <ServiceList>
                  <ListNumber>1</ListNumber>
                  <ListText>No services to display</ListText>
                </ServiceList>
              ) : null}
            </DetailsServices>
          )}
          <div className="maps">
            <MapBox
              apiKey="AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
              className="map-box"
              opts={{
                center: {
                  lat: state.resourceLocation.lat,
                  lng: state.resourceLocation.lon
                },
                zoom: 14
              }}
            />
          </div>
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
          <ButtonsDiv className="button-div">
            <NavLink to={`/home/${category}`}>
              <div className="previous-button">
                <PreviousButton>
                  <i className="fas fa-arrow-left" />
                  Previous Page
                </PreviousButton>
              </div>
            </NavLink>
            <PrintButton onClick={() => printPage()}>
              <i className="fas fa-print" />
              PRINT
            </PrintButton>
          </ButtonsDiv>
        </GoogleMapProvider>
      </SingleResourceCard>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SingleResource);
