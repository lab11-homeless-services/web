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
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <a>Back to Categories</a>
        </div>
      {Object.keys(subCats).map(subCat => {
        if (subCat === 'all') {
          return(
            <div className='right-arrow'>
              <MainCatBTN>
              <BreadcrumbMainCat cat={id}/>
              </MainCatBTN>
              <i class="fas fa-arrow-right"></i>
            </div>
            
          )
        }
        console.log("tabs", Object.keys)
        return (
          <div className='subcatbtn'>
            <Tabs className="test">
              <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat}</NavLink>
            </Tabs>
          </div>
            
          );
      })}
    </TabContainer>
  );
};

export default TabNav;

const Tabs = styled.div` 
  background-color: white;
  padding: 6px; 
  box-shadow: 1px 1px 1px 1px #00000050;

`;


const TabContainer = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 18px;
  display: flex;
  justify-content: left;
  align-items: center; 
  margin-left: 50px;
`
const MainCatBTN = styled.div`
  width: 70px;
  height: 70px;
  background-color: #414361;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  border: 1px solid white;
  margin-left: 10px;
  box-shadow: 1px 2px 4px 2px #00000050;
`;