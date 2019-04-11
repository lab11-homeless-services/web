import React, { useReducer, useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import latlngDist from "latlng-distance";
import styled from "styled-components";

const ResourcesNearestYou = props => {
    console.log('resource props', props);

    const paths = props.props.location.pathname.split('/');
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
    
      listOfResources = fetcher(
        `https://empact-e511a.firebaseio.com/${category}/all.json`
      );
    
      console.log(listOfResources)
    
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
    
      sortArrayOfObjects(newResources, "distance")
      console.log(newResources)
      let list = []
      for (let i = 0; i < 3; i++) {
        list.push(newResources[i])
      }

      return (
        <div>
            {list.map(item => {
                console.log(item)
                if (item && item.name) {
                    return(
                        <div>
                            <Link to={`/home/${category}/all/${item.id}`}>
                            <div>{item.name}</div>
                            </Link>
                        </div>
                        
                    )
                } else {
                    return(
                        <div>Loading</div>
                    )
                }
                
            })}
        </div>
      );
}

export default ResourcesNearestYou;