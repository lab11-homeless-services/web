//Importing React and React related functions
import React, { useReducer, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//Importing Axios
import axios from "axios";

//Importing Styled Compomnents
import styled from "styled-components";

// Importing Google Maps packages.
import {
  GoogleMapProvider,
  InfoWindow,
  MapBox,
  Marker
} from "@googlemap-react/core";
import { GoogleApiWrapper } from "google-maps-react";

//Card Container
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

// Container for info text
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

//Info text
const InfoText = styled.div`
  padding-bottom: 30px;
`;

//Resource Name
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #323131
  padding-bottom: 31px;
  letter-spacing: 1px;
`;

//Container for Details/Services Tab Nav
const DetailsServices = styled.div`
  height: 361px;
  width: 32%;
  padding-top: 31px;
  margin-right: 3%;

  @media (max-width: 1024px) {
    width: 45%;
    padding-top: 45px;
    margin-bottom: 20px;
    padding-left: 3%;
  }

  @media (max-width: 600px) {
    height: auto;
    width: 100%;
    padding: 50px 4% 0 4%;
  }
`;

// Titles on Details/Services Tab Nav
const DetailsTitles = styled.div`
  display: flex;
  padding-bottom: 7px;
`;

//Details/Services list, number, and text styles
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

// Container for Print and Previous Button
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

//Buttons
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

const SingleResource = props => {
  // Setting Initial state
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

      visible: true,
      zoom: 14,
      walkingTime: "",
      transitTime: "",
      showingDetails: true,
      showingServices: false
    }
  );

  function fetcher(url) {
    //Fetching resources
    const [data, setData] = useState([]);
    async function getResources() {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
    }

    //locating the user using geolocation and setting state to
    //their current location
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

  //Accesses each piece of the pathname from the array created above
  let category = paths[2];
  category = category.replace(/\s+/g, "_");
  const subCat = paths[3];
  const singleResource = paths[4];

  // Outreach services' "all" subcategory is structure differently than the other
  // categories to accomodate a change for iOS. It is "_all." This required a separate
  // fetch. Seen below is the fetch for all other categories
  if (category !== "outreach_services") {
    const resource = fetcher(
      `https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`
    );

    /*-------Google Distance Matrix---------*/
    const { google } = props;

    // Creating google maps latitude/logitude objects based on resouce location
    // and user location
    if (resource !== undefined) {
      let destination = new google.maps.LatLng(
        resource.latitude,
        resource.longitude
      );
      let origin = new google.maps.LatLng(
        state.currentLocation.lat,
        state.currentLocation.lon
      );

      // Calling the Google Distance Matrix to create a new distance matrix object
      // for Walking
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

      // Calling the Google Distance Matrix to create a new distance matrix object
      // for Transit
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

      //Callback to set the state of resource location and walkingTime
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

      //Callback to set the state of transitTime
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

    //Function to open map with "View Map Button"
    const openMap = e => {
      const name = resource.name.split(" ").join("+");
      const address = resource.address.split(" ").join("+");

      window.open(
        `https://www.google.com/maps/search/?api=1&query=${name}+${address}`
      );
    };

    //Function to open print window when Print button is clicked
    const printPage = e => {
      window.print();
    };

    //Function to show Serivices Tab
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

    //Function to show Details Tab
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
    // Fetch for Outreach Serives Data. The code below this fetch is duplicated from the
    // code above.
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

// This is needed to use the Google Maps API. Protect your key in the google cloud
// services platform. You can restrict it to only work from certain URLs
export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SingleResource);
