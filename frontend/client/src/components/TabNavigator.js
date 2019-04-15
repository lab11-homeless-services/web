import React from "react";
import { NavLink } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from 'styled-components';
import BreadcrumbMainCat from '../components/BreadcrumbMainCat'

const TabNav = props => {
    let id = props.match.params.id;
    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <TabContainer>
      <a>Back to Categories</a>
      {Object.keys(subCats).map(subCat => {
        if (subCat === 'all') {
          return(
            <BreadcrumbMainCat cat={id}/>
          )
        }
        console.log("tabs", Object.keys)
        return (
            <Tabs className="test">
              <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat}</NavLink>
            </Tabs>
          );
      })}
    </TabContainer>
  );
};

export default TabNav;

const Tabs = styled.div` 
  padding: 10px 3px 10px 25px;
  margin: 0 60px;
  background-color: white; 
  border: #9B9B9B solid 1px;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center; 
  justify-items: space-around;
  border: rebeccapurple solid 2px;
`
