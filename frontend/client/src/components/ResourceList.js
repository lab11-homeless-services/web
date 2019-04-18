import React, { useState } from "react";
import useFetchSingle from "../functions/useFetchSingle";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResourceListContainer = styled.div`
  padding: 5% 0 0 5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 80%;
  width: 90%;
`;

const ResourceListCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 225px;
  border: 0.25px solid black;
  box-shadow: 1px 1px 3px 1px #ccc;
  border-radius: 3px;
  margin-top: 20px;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;

const ResourceListCardDetails = styled.div`
  margin: 10px;
  font-size: 12px;
`;

const ResourceDetailsButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  background-color: #414361;
  width: 25%;
  height: 100%;
  margin: 5px;
  margin-left: 25%;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 1px #ccc;
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
          <ResourceListCard>
            <ResourceListCardDetails>{resource.name}</ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-map-marker-alt" /> {resource.address}
            </ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-phone" /> {resource.phone}
            </ResourceListCardDetails>
            <ResourceListCardDetails>
              <i class="fas fa-clock" /> {resource.hours}
            </ResourceListCardDetails>
            <Link to={`/home/${category}/${subCat}/${resourceId}`}>
              <ResourceDetailsButton>
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
