import React from "react";
import LandingSearchBar from "../components/LandingSearchBar";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../state/state";
import styled from "styled-components";

import touch from "../img/touch.png";
import landingImage from "../img/ctaLandingView.png";
import logo from "../img/logo.png";

const LandingViewContainer = styled.div`
  max-width: 1366px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  overflow-x: hidden;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LandingSearchContainer = styled.div`
  width: 52%;
  display: flex;
  flex-direction: column;
  padding-left: 3%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LandingImageContainer = styled.div`
  width: 48%;
  height: 100vh;
  @media (max-width: 600px) {
    width: 100%;
    height: 55%
  }
`;

const LandingHeader = styled.h1`
  font-size: 1.2rem;
  margin: 20% 0 0 2%;
  width: 100%;
  letter-spacing: 2px;
  @media (max-width: 1024px) {
    margin: 25% 0 0 0;
  };
  @media (max-width: 600px) {
    margin: 33% 0 0 0;
  }
`;

const LandingSearchInput = styled.div`
  margin: 15% 0 0 2%;
  width: 100%;
  @media (max-width: 1024px) {
    margin: 8% 0 0 0;
  }
`;

const LandingLanguageSelectionContainer = styled.div`
  display: flex;
  width: 71%;
  margin-top: 20%
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 79%;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 7%;
  };
  @media (max-width: 600px) {
    width: 100%;
    margin: 9% 0 7% 0;
    justify-content: space-evenly;
  }
`;

const LandingLanguageSelectionButton = styled.div`
  width: 200px;
  height: 75px;
  background-color: #414361;
  border-radius: 4px;
  box-shadow: 1px 2px 4px 2px #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: white;
  margin: 0 0 0 38%;
  letter-spacing: 2px;
  @media (max-width: 1024px) {
    width: 200px;
    height: 75px;
    margin: 0 0 20% 0;
  }
  @media (max-width: 600px) {
    width: 150px;
    height: 45px;
    margin: 0 0 20% 0;
    font-size: 1.2rem;
  }
`;

const LandingLanguageImage = styled.img`
  width: 16%;
  height: 50%;
  margin-left: 10%;
`;

const LogoContainer = styled.div`
  height: 30%;
  width: 100%;
  background-color: #414361;
  border-radius: 4px 60px 0 0;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    height: 22%;
    border-radius: 0;
    justify-content: center;
  }
`;

const LandingCTAImg = styled.img`
  height: 63%;
  width: 100%;
  border-radius: 0 0 16px 4px;
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
`;

const LandingLogoImg = styled.img`
  width: 45%;
  margin: 0 0 0 7%;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

const LandingNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-top: 9%;
  letter-spacing: 2px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LandingNavBarText = styled.div`
  color: #414361;
  font-size: .7rem;
  display: flex;

  p {
    margin-left: 10px;
  }

  @media (max-width: 800px) {
    i {
      display: none;
    }
  }
`;

const LandingFooter = styled.div`
  background-color: #414361;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LandingView = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <div>
      <LandingViewContainer>
        <LandingImageContainer>
          <LogoContainer>
            <LandingLogoImg src={logo} />
          </LogoContainer>
          <LandingCTAImg src={landingImage} alt="" />
        </LandingImageContainer>
        <LandingSearchContainer>
          <LandingNavBar>
            <LandingNavBarText>
              <i class="fas fa-book-reader fa-lg" /> 
              <p>ABOUT US</p>
            </LandingNavBarText>
            <LandingNavBarText>
              <i class="fas fa-user-friends fa-lg" /> 
              <p>VOLUNTEER</p>
            </LandingNavBarText>
            <LandingNavBarText>
              <i class="far fa-handshake fa-lg" /> 
              <p>OUR PARTNERS</p>
            </LandingNavBarText>
            <LandingNavBarText>
              <i class="far fa-envelope fa-lg" /> 
              <p>CONTACT US</p>
            </LandingNavBarText>
          </LandingNavBar>
          <LandingHeader>Search and find resources...</LandingHeader>
          <LandingSearchInput>
            <LandingSearchBar />
          </LandingSearchInput>
          <LandingLanguageSelectionContainer className="language">
            <NavLink to="/home">
              <LandingLanguageSelectionButton>
                <p>English</p>
                <LandingLanguageImage src={touch} />
              </LandingLanguageSelectionButton>
            </NavLink>
            <NavLink to="/home">
              <LandingLanguageSelectionButton
                spanish={spanish.spanish}
                onClick={() =>
                  dispatch({
                    type: "setSpanish",
                    language: true
                  })
                }
              >
                <p>Español?</p>
                <LandingLanguageImage src={touch} />
              </LandingLanguageSelectionButton>
            </NavLink>
          </LandingLanguageSelectionContainer>
        </LandingSearchContainer>
      </LandingViewContainer>
      <LandingFooter />
    </div>
  );
};

export default LandingView;
