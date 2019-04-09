import { useState, useEffect, useReducer } from 'react'

export default function getCoordinates() {
  const [currentLocation] = useState([{lat: null, lon: null}])
  const [setState] = useState((state, newState) => ({...state, ...newState}))

  async function getCoors() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        
        const coords = pos.coords;
        setState({
          currentLocation: {
            lat: coords.latitude,
            lon: coords.longitude,
          }
        });
      })
    }
  }
  useEffect(() => {
    getCoors()
  }, [])
  return currentLocation
}