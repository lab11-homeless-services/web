import React, { useState } from "react";
import useFetchSingle from "../functions/useFetchSingle";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResourceDetailsButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #323131;
  background-color: #d6d8dc;
  width: 50%;
  margin: 10px;
  margin-left: 25%;
  padding: 10px 1%;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 1px #888;
  letter-spacing: 1px;
  font-size: 1rem;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;

  @media (max-width: 1024px) {
    width: 63%;
    margin: 0 auto;
    padding: 12px 2%;
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
  }
`;

const ResourceListCardDetails = styled.div`
  margin: 10px;
  font-size: 0.9rem;
  color: #9b9b9b;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  i {
    padding-right: 10px;
  }
  &:first-child {
    margin-left: 5%;
    color: #323131;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const ResourceListCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 2%;
  width: 350px;
  border: 0.25px solid black;
  box-shadow: 0px 0px 0px 1px #ccc;
  border-radius: 3px;
  margin-top: 20px;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    border: 0.25px solid black;
    box-shadow: 1px 1px 3px 1px #ccc;
  }
  &:hover ${ResourceDetailsButton} {
    color: white;
    background-color: #414361;
    font-weight: bold;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }
  &:hover ${ResourceListCardDetails} {
    color: #4a4a4a;
    i{
      color: #414361;
    }
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }
  @media (max-width: 600px) {
    margin-top: 10px;
    padding-bottom: 30px;
`;

const ResourceListContainer = styled.div`
  padding: 5% 0 0 5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;

  @media (max-width: 600px) {
    padding: 5% 0 30px 5%;
  }
`;

const ResourceList = props => {
  //Setting List of resources on state as an empty array
  let [listOfResources] = useState([]);

  const paths = props.props.location.pathname.split("/");
  let category = paths[2];
  let subCat = paths[3];
  let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`;

  //   listOfResources = useCallback(useFetchSingle(url));
  listOfResources = useFetchSingle(url);

  // Created an id to reference a resources that auto increments
  let id = 0;

  return (
    <ResourceListContainer>
      {listOfResources.map(resource => {
        let resourceId = id;
        id++;
        console.log("resource:", resource);
        return (
          <ResourceListCard className="resource-container">
            <ResourceListCardDetails>{resource.name}</ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-map-marker-alt" /> {resource.address}
            </ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-phone" />{" "}
              {resource.phone ? resource.phone : "Unavailable"}
            </ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-clock" />{" "}
              {resource.hours ? resource.hours : "Unavailable"}
            </ResourceListCardDetails>
            <Link to={`/home/${category}/${subCat}/${resourceId}`}>
              <ResourceDetailsButton className="details-button">
                <i class="fas fa-external-link-alt" /> View
              </ResourceDetailsButton>
            </Link>
          </ResourceListCard>
        );
      })}
    </ResourceListContainer>
  );
};

export default ResourceList;
