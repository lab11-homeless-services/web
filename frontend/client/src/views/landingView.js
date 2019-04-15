import React from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";
import styled from "styled-components";
import touch from '../img/touch.png';

const LandingViewContainer = styled.div`
  width: 1366px;
  margin: 0 auto;
  display: flex;
`;

const LandingSearchContainer = styled.div`
  width: 52%;
  display: flex;
  flex-direction: column;
  padding: 4% 0 0 3%;
`;

const LandingImageContainer = styled.div`
  width: 48%;
  border: 1px solid red;
`;

const LandingHeader = styled.h1`
  font-size: 18px;
  margin: 20% 0 0 2%;
`;

const LandingSearchInput = styled.div`
  margin: 15% 0 0 2%;
`;

const LandingLanguageSelectionContainer = styled.div`
  width: 485px;
  display: flex;
  justify-content: space-between;
  margin: 21% 0 0 11%;
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
  font-size: 26px;
  color: white;
`;

const LandingLanguageImage = styled.img`
  width: 30px;
  height: 35px;
  margin-left: 20px;
`;

const LandingLanguageLink = styled.a`

`;

const LandingNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 96%;
`;

const LandingNavBarText = styled.p`
  color: #414361;
  font-size: 12px;
`;

const LandingFooter = styled.div`
  background-color: #414361;
  width: 100%;
  height: 30px;
  position: fixed;
  bottom: 0;
`;

const LandingView = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <div>
    <LandingViewContainer>
      <LandingImageContainer>
        <img src="" alt="" />
      </LandingImageContainer>
      <LandingSearchContainer>
        <LandingNavBar>
          <LandingNavBarText>
            <i class="fas fa-book-reader fa-lg" /> ABOUT US
          </LandingNavBarText>
          <LandingNavBarText>
            <i class="fas fa-user-friends fa-lg" /> VOLUNTEER
          </LandingNavBarText>
          <LandingNavBarText>
            <i class="far fa-handshake fa-lg" /> OUR PARTNERS
          </LandingNavBarText>
          <LandingNavBarText>
            <i class="far fa-envelope fa-lg" /> CONTACT US
          </LandingNavBarText>
        </LandingNavBar>
        <LandingHeader>Search and find resources...</LandingHeader>
        <LandingSearchInput>
          <SearchBar />
        </LandingSearchInput>
        <LandingLanguageSelectionContainer className="language">
          <Link to="/home">
            <LandingLanguageSelectionButton>
              <p>English</p>
              <LandingLanguageImage src={touch} />
            </LandingLanguageSelectionButton>
          </Link>
          <Link to="/home">
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
          </Link>
        </LandingLanguageSelectionContainer>
      </LandingSearchContainer>
    </LandingViewContainer>
    <LandingFooter />
    </div>
  );
};

export default LandingView;
