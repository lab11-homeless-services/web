import React, { useReducer, useState, useEffect } from "react";
import LandingSearchBar from "../components/LandingSearchBar";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../state/state";
import styled from "styled-components";

import touch from "../img/touch.png";
import landingImage from "../img/landingPageImg.jpg";
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
    margin-bottom: 30px;
  }
`;

const LandingSearchContainer = styled.div`
  width: 52%;
  display: flex;
  flex-direction: column;
  padding-left: 3%;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0%;
  }
`;

const LandingImageContainer = styled.div`
  width: 48%;
  height: auto;
  background: #414361;
  border-radius: 0 60px 100px 0;
  @media (max-width: 1024px) {
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 55%;
  }
`;

const LandingHeader = styled.h1`
  font-size: 1.15rem;
  margin-left: 2%;
  width: 90%;
  letter-spacing: 3px;
  color: #4a4a4a;
  font-weight: lighter;
  line-height: 30px;

  @media (max-width: 1024px) {
    margin: 25% 0 0 0;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 90px 3% 20px 10%;
    width: 100%;
  }
`;

const LandingSearchInput = styled.div`
  margin: 10% 0 0 2%;
  width: 100%;
  padding-right: 3%;

  @media (max-width: 1024px) {
    margin: 8% 0 0 0;
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    padding-bottom: 80px;
    margin-left: 1.5%;
  }
`;

const LandingLanguageSelectionContainer = styled.div`
  display: flex;
  width: 75%;
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
    margin: 40px 0 40px 0;
    justify-content: space-evenly;
  }
`;

const LandingLanguageSelectionButton = styled.div`
  width: 200px;
  height: 75px;
  background-color: #414361;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: white;
  margin: 0 25px 0 38%;
  letter-spacing: 2px;
  box-shadow: 0px 1px 3px 1px #ccc;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 1px 2px 4px 2px #00000050;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
  }

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
    padding: 30px 3%;
  }
`;

const LandingLanguageImage = styled.img`
  width: 16%;
  margin-left: 10%;
  color: #414361;
`;

const LogoContainer = styled.div`
  height: 30%;
  width: 100%;
  background-color: #414361;
  border-radius: 4px 60px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    height: 39%;
    border-radius: 0;
    justify-content: center;
    align-items: center;
  }
`;

const LandingCTAImg = styled.img`
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LandingLogoImg = styled.img`
  display: flex;
  width: 45%;
  margin: 0 0 0 7%;

  @media (max-width: 600px) {
    margin: 0;
  }
`;

// const LandingNavBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 95%;
//   margin-top: 9%;
//   letter-spacing: 2px;

//   @media (max-width: 600px) {
//     display: none;
//
//   }
// `;

const LandingNavBarText = styled.div`
  color: #414361;
  font-size: 0.7rem;
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
  // const [{ spanish }, dispatch] = useStateValue();
  // const [state, setState] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   { displayModal: false }
  // );

  const [displayModal, setState] = useState(false);

  const closeModal = e => {
    e.preventDefault();
    setState(false);
  };
  console.log(displayModal);

  return (
    <div>
      <LandingViewContainer>
        <LandingImageContainer>
          <LogoContainer>
            <LandingLogoImg src={logo} />
            <p className="subscript">Serving the boroughs of NYC</p>
          </LogoContainer>
          <LandingCTAImg src={landingImage} alt="" />
        </LandingImageContainer>
        <LandingSearchContainer>
          {/* <LandingNavBar>
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
          </LandingNavBar> */}
          <LandingHeader>
            Extending empathy through technology to connect people experiencing
            homelessness to critical information.
          </LandingHeader>
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
            <NavLink to="">
              <LandingLanguageSelectionButton
                // spanish={spanish.spanish}
                onClick={() => setState(true)}
              >
                <p>Español?</p>
                <LandingLanguageImage src={touch} />
              </LandingLanguageSelectionButton>
            </NavLink>
          </LandingLanguageSelectionContainer>
        </LandingSearchContainer>
      </LandingViewContainer>
      <LandingFooter />
      <Modal show={displayModal} close={closeModal}>
        <h2>La Traducción al Español vendrá pronto!</h2>
        <h4>Spanish Translation Coming Soon!</h4>
      </Modal>
    </div>
  );
};

const Modal = ({ close, show, children }) => {
  const showHideClassName = show
    ? "spanishModal display-block"
    : "spanishModal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-language">
        {children}
        <div className="closeModalButton" onClick={close}>
          X
        </div>
      </section>
    </div>
  );
};

export default LandingView;
