import React from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import ListOfCats from "../components/ListOfCategories";
import ShelterNearestYou from "../components/ShelterNearestYou";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  map: {
    position: "absolute",
    left: "700px",
    top: "300px",
    width: "40%",
    height: "50%"
  }
};

class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    //Initial State for info window, marker, and selected place
    this.state = {
      currentLocation: {
        lat: 40.785091,
        lng: -73.968285
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      centerAroundCurrentLocation: false,
      visible: true,
      zoom: 14
    };
  }

  //On a click, the marker appears, place is selected, info window is visible
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: this.state.selectedPlace,
      activeMarker: marker,
      showingInfoWindow: true
    });

  // Info window closes and marker is no longer visible
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  //loadMap() function is only called after the component has been rendered
  //and grabs a reference to the DOM component to where we want our map to be placed.

  loadMap() {
    if (this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.state;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      this.setState({
        centerAroundCurrentLocation: true
      });
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  //when the map has already loaded, componentDidMount() will set a call-
  //back to fetch the current location.

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
    this.loadMap();
  }

  //Check if map API is loaded, check if the browser's current location
  //is provided and recenter the map to it.

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  //recenterMap() function only gets called when the currentLocation in the
  //component's state is updated and uses the .panTo() method on the google.maps.Map
  //instance to change the center of the map.

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  render() {
    const { google } = this.props;

    var origin1 = new google.maps.LatLng(55.930385, -3.118425);
    var origin2 = "Greenwich, England";
    var destinationA = "Stockholm, Sweden";
    var destinationB = new google.maps.LatLng(50.087692, 14.42115);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: "DRIVING"
      },
      callback
    );

    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      console.log(response);
    }

    // let origin = new google.maps.LatLng(
    //   this.state.currentLocation.lat,
    //   this.state.currentLocation.lng
    // );
    // let destination = new google.maps.LatLng(40.745377, -73.981306);

    // google.maps.DistanceMatrixService(
    //   { origin: origin, destination: destination, travelMode: "TRANSIT" },
    //   (res, status) => {
    //     if (status === "OK") {
    //       console.log("distances", res);
    //     } else {
    //       console.log("status", status);
    //     }
    //   }
    // );
    const style = Object.assign({}, mapStyles.map);
    console.log(this.props);
    console.log("state", this.state);

    return (
      <div>
        <div>
          <div style={style} ref="map">
            Loading map...
          </div>
        </div>
        <div>
          <Marker onClick={this.onMarkerClick} name={"current location"} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace}</h4>
            </div>
          </InfoWindow>
        </div>
        <Header {...this.props} />
        <ListOfCats />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD2VA4VZXz5Hj7mr7s4L8Oybt1rX2fp7f4"
})(CategoriesView);
