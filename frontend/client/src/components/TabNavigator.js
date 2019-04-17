import React from "react";
import { NavLink } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from 'styled-components';
import BreadcrumbMainCat from '../components/BreadcrumbMainCat'
import man from '../img/subcatimg/man.png'
import woman from '../img/subcatimg/woman.png'
import youth from '../img/subcatimg/youth.png'
import clinics from '../img/subcatimg/clinic.png'
import emergency from '../img/subcatimg/emergency.png'
import hiv from '../img/subcatimg/hiv-aids.jpg'
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
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <NavLink to={`/home/`}>Back to Categories</NavLink>
        </div>
      {Object.keys(subCats).map(subCat => {
        if (subCat === '_all' ) {
          return(
            <div className='right-arrow'>
              <MainCatBTN>
              <BreadcrumbMainCat cat={id}/>
              </MainCatBTN>
              <i class="fas fa-arrow-right"></i>
            </div>
            
          )
        }

        if (subCat === 'after_school') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={afterSchool} alt="after school"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'domestic_violence') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={abuse} alt="domestic violence"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'social_services') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={socialServices} alt="social services"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }
        console.log("tabs", Object.keys)
        return (
          <div className='subcatbtn'>
            <Tabs className="test">
              <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
            </Tabs>
          </div>
            
          );
      })}
    </TabContainer>
    );
   }

    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <TabContainer>
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <NavLink to={`/home/`}>Back to Categories</NavLink>
        </div>
      {Object.keys(subCats).map(subCat => {
        if (subCat === 'all' ) {
          return(
            <div className='right-arrow'>
              <MainCatBTN>
              <BreadcrumbMainCat cat={id}/>
              </MainCatBTN>
              <i class="fas fa-arrow-right"></i>
            </div>
            
          )
        }
        if (subCat === 'men') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={man} alt="man"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'women') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={woman} alt="woman"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }
        if (subCat === 'youth') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={youth} alt="youth"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'clinics') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={clinics} alt="clinics"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'emergency') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={emergency} alt="emergency"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'hiv') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={hiv} alt="hiv"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'mental_health') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={mental} alt="mental health"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'rehab') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={rehab} alt="rehab"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'food_pantries') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={pantry} alt="food pantries"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'food_stamps') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={stamps} alt="food stamps"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'bathrooms') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={bathroom} alt="bathrooms"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'showers') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={shower} alt="showers"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'ged') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={ged} alt="GED"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'public_computers') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={computers} alt="computers"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }

        if (subCat === 'benefits') {
          return (
            <div className='subcatbtn'>
              <Tabs className="test">
                <StyledSubCatIcon src={benefits} alt="benefits"/>
                <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
              </Tabs>
            </div>
            );
        }




        return (
          <div className='subcatbtn'>
            <Tabs className="test">
              <NavLink className="tablinks" to={`/home/${id}/${subCat}`}>{subCat.replace(/_/g, ' ').toUpperCase()}</NavLink>
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

const StyledSubCatIcon = styled.img`
  width: 30px;
`