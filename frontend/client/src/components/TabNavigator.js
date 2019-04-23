import React from "react";
import { NavLink } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from 'styled-components';
import BreadcrumbMainCat from '../components/BreadcrumbMainCat'
import man from '../img/subcatimg/man.png'
import woman from '../img/subcatimg/woman.png'
import youth from '../img/subcatimg/youth.png'
import clinics from '../img/subcatimg/clinic2.png'
import emergency from '../img/subcatimg/emergency.png'
import hiv from '../img/subcatimg/hiv-aids.jpeg'
import mental from '../img/subcatimg/mental_health.jpg'
import rehab from '../img/subcatimg/rehab.png'
import pantry from '../img/subcatimg/food_pantry.png'
import stamps from '../img/subcatimg/food_stamps.png'
import bathroom from '../img/subcatimg/bathroom.png'
import shower from '../img/subcatimg/shower.png'
import afterSchool from '../img/subcatimg/after_school.png'
import abuse from '../img/subcatimg/abuse.png'
import socialServices from '../img/subcatimg/social_service.png'
import ged from '../img/subcatimg/GED.png'
import computers from '../img/subcatimg/computers.png'
import benefits from '../img/subcatimg/health_ins.png'


const TabNav = props => {
    let id = props.match.params.id;

   if(id.includes('outreach')) {
    id = id.replace(/\s+/g, "_");
    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);
    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <TabContainer>
        <BackToCatContainer>
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <NavLink to={`/home/`}>Back to Categories</NavLink>
        </div>
        </BackToCatContainer>
      <SubCatContainer>
      {Object.keys(subCats).map(subCat => {
        if (subCat === '_all' ) {
          return(
            <div className='right-arrow'>
              <BreadcrumbMainCat cat={id}/>
              <i class="fas fa-arrow-right"></i>
            </div> 
          )
        }
        if (subCat === 'after_school') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs className="test">
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={afterSchool} alt="after school"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'domestic_violence') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs className="test">
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={abuse} alt="domestic violence"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" id='unacceptableLength' to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'social_services') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs className="test">
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={socialServices} alt="social services"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
      })}
      </SubCatContainer>
    </TabContainer>
    );
   }

    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <TabContainer>
        <BackToCatContainer>
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <NavLink to={`/home/`}>Back to Categories</NavLink>
        </div>
        </BackToCatContainer>
      <SubCatContainer>
      {Object.keys(subCats).map(subCat => {
        if (subCat === 'all' ) {
          return(
            <div className='right-arrow'>
              <BreadcrumbMainCat cat={id}/>
              <i class="fas fa-arrow-right"></i>
            </div>
            
          )
        }
        if (subCat === 'men') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={man} alt="man"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'women' && id === "health_care") {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn' id="moveOnOver" >
                <Tabs >
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={woman} alt="woman"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        } 
        if(subCat === 'women' && id === "shelters"){
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn' >
                <Tabs >
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={woman} alt="woman"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'youth') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={youth} alt="youth"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'clinics') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={clinics} alt="clinics"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'emergency') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={emergency} alt="emergency"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'hiv') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={hiv} alt="hiv"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'mental_health') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={mental} alt="mental health"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'rehab') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn' id='moveOnOver'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={rehab} alt="rehab"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'food_pantries') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={pantry} alt="food pantries"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'food_stamps') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={stamps} alt="food stamps"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'bathrooms') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={bathroom} alt="bathrooms"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'showers') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={shower} alt="showers"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'ged') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={ged} alt="GED"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'public_computers') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
              <div className='subcatbtn'>
                <Tabs>
                  <div className='subcatIcon'>
                    <StyledSubCatIcon src={computers} alt="computers"/>
                    <div class="vl"></div>
                  </div>
                  <div className='subCatLink'>
                    <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                </Tabs>
              </div>
            </NavLink>
          );
        }
        if (subCat === 'benefits') {
          return (
            <NavLink to={`/home/${id}/${subCat}`}>
            <div className='subcatbtn'>
              <Tabs>
                <div className='subcatIcon'>
                  <StyledSubCatIcon src={benefits} alt="benefits"/>
                  <div class="vl"></div>
                </div>
                <div className='subCatLink'>
                  <p className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</p>
                </div>
              </Tabs>
            </div>
            </NavLink>
          );
        }
      })}
      </SubCatContainer>
    </TabContainer>
  );
};

export default TabNav;

const TabContainer = styled.div`
  height: 90px;
  margin: 3%;
  display: flex;
  justify-content: left;
  align-items: center; 
  @media (max-width: 600px) {
    height: auto;
    flex-direction: column;
    margin-bottom: 0;
  }
`
const SubCatContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    margin-top 
  }
`
const Tabs = styled.div` 
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 140px;
  height: 45px;
  margin-left: 20px;
  border: #9b9b9b solid 1px;
  @media (max-width: 600px) {
    margin: 0 0 0 0;

  }
`;

const StyledSubCatIcon = styled.img`
  width: 35px;
  margin: 3px;
`;

const BackToCatContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    display: flex;
    width: 40%;
    align-items: center;
  }
`;