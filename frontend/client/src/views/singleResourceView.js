import React, { useReducer } from "react";
import useFetchSingle from "../functions/useFetchSingle";
import Header from "../components/Header.js";
import TabNavforSubView from "../components/TabNavforSubView";
const SingleResourceView = props => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showingDetails: true,
      showingServices: false
    }
  );


  //Splits path name at backslash
  const paths = props.location.pathname.split("/");

  //Accesses each piece of the pathname from the array createdabove
  const category = paths[2];
  const subCat = paths[3];
  const singleResource = paths[4];

  //Fetching a Single Resource
  const resource = useFetchSingle(
    `https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`
  );

  const showServices = e => {
    e.preventDefault()
    setState({
      ...state,
      showingDetails: false,
      showingServices: true
    })
  }

  const showDetails = e => {
    e.preventDefault()
    setState({
      ...state,
      showingDetails: true,
      showingServices: false
    })
  }
  


  if (resource.details && resource.services) {
    return (
      <div>
        <Header />
        <TabNavforSubView props={props} />
        <div>
          <p>{resource.name}</p>
          <p>{resource.address}</p>
          <p>{resource.city}</p>
          <h4 onClick={showDetails}>Details</h4>
          {state.showingDetails === true ? resource.details.map(detail => (
            <p>{detail}</p>
          )) : null}
          <h4 onClick={showServices}>Services</h4>
          {state.showingServices === true ? resource.services.map(service => (
            <p>{service}</p>
          )) : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <TabNavforSubView props={props} />
        <div>
          <p>{resource.name}</p>
          <p>{resource.address}</p>
          <p>{resource.city}</p>
        </div>
      </div>
    );
  }
};

export default SingleResourceView;
