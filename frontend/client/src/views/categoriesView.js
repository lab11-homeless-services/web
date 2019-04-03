import React from "react";
import Header from "../components/Header";
import ListOfCats from "../components/ListOfCategories";
import ShelterNearestYou from "../components/ShelterNearestYou";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import CurrentLocation from "../components/Map";

require("dotenv").config();
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

class CategoriesView extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"current location"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
        <Header {...this.props} />
        <ListOfCats />
        <ShelterNearestYou {...this.props} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  API_KEY
})(CategoriesView);
