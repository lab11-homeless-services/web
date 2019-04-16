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
  border-radius: 3px;
  height: 501px;
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
`;

const Info = styled.div`
  height: 400px;
  width: 32%;
  color: #4a4a4a;
  padding-top: 45px;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 31px;
`;

const DetailsServices = styled.div`
  height: 361px;
  width: 32%;
  margin-right: 3%;
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
`;

const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  color: #4a4a4a;
  background: #cbccd1;
  border-radius: 2px;
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

const mapStyles = {
  map: {
    width: "384px",
    height: "363px"
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
        <Info>
          <Title>{resource.name}</Title>
          <InfoText>
            <i class="fas fa-map-marker-alt" />
            {resource.address}
          </InfoText>

          <div className="travel-time">
            {state.walkingTime.length && state.transitTime.length > 0 ? (
              <InfoText>
                <i class="fas fa-bus" />
                {state.transitTime}
                <i class="fas fa-walking" /> {state.walkingTime}
              </InfoText>
            ) : (
              "Travel Time Loading"
            )}
          </div>
          <div className="info-hours">
            <InfoText>
              <i class="fas fa-phone" />
              {resource.phone}
              <i class="fas fa-clock" />
              {resource.hours}
            </InfoText>
          </div>
          <div onClick={() => openMap()}>View Map</div>
        </Info>
        {resource.details && resource.services ? (
          <DetailsServices>
            <DetailsTitles>
              <ServiceButton onClick={showServices}>Services</ServiceButton>
              <ServiceButton onClick={showDetails}>Details</ServiceButton>
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
        ) : null}
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
        <ButtonsDiv>
          <PreviousButton>
            <i class="fas fa-arrow-left" />
            Previous Page
          </PreviousButton>
          <PrintButton>
            <i class="fas fa-print" />
            PRINT
          </PrintButton>
        </ButtonsDiv>
      </GoogleMapProvider>
    </SingleResourceCard>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(SingleResource);
