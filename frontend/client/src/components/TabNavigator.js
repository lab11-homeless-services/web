import React from "react";
import { NavLink, Link } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from 'styled-components';
import BreadcrumbMainCat from '../components/BreadcrumbMainCat'

const JobCat = styled.div`
  margin-left: 7%;
  margin-top: 2%;
`

const TabNav = props => {
    let id = props.match.params.id;
    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    if(id === 'jobs') {
      return (
      <JobCat>
        <i class="fas fa-arrow-left"></i>
        <Link to="/home" className="back2catJobs">Back to Categories</Link>
      </JobCat>
      ) 
    }

    return (
      <TabContainer>
        <i class="fas fa-arrow-left"></i>
        <Link to="/home" className="back2cat">Back to Categories</Link>
      {Object.keys(subCats).map(subCat => {
        if (subCat === 'all') {
          return(
            <div className='right-arrow'>
              <MainCatBTN>
              <BreadcrumbMainCat cat={id}/>
              </MainCatBTN>
              {id === "jobs" ? null : <i class="fas fa-arrow-right"></i>}
            </div>
            
          )
        }
        console.log("tabs", Object.keys)
        return (
            <Tabs className="test">
              <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
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
const MainCatBTN = styled.div`
  width: 70px;
  height: 70px;
  background-color: #414361;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  border: 1px solid white;
  margin-left: 90px;
  box-shadow: 1px 2px 4px 2px #00000050;
`;