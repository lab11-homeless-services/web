import React from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";
import Footer from "../components/Footer";
import styled from "styled-components";

const LandingViewContainer = styled.div`
  width: 1366px;
  margin: 0 auto;
  display: flex;
  border: 1px solid red;
`;

const LandingSearchContainer = styled.div`
  width: 52%;
  display: flex;
  flex-direction: column;
  padding: 14.5% 0 0 4%;
  border: 1px solid blue;
`;

const LandingImageContainer = styled.div`
  width: 48%;
  border: 1px solid green;
`;

const LandingHeader = styled.h1`
  font-size: 18px;
`;

const LandingSearchInput = styled.div`
  margin: 15% 0 0 0;
`;

const LandingLanguageSelectionContainer = styled.div`
  width: 485px;
  display: flex;
  justify-content: space-between;
  margin: 22% 0 0 10%;
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

const LandingView = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <LandingViewContainer>
      <LandingImageContainer>
        <img src="" alt="" />
      </LandingImageContainer>
      <LandingSearchContainer>
        <LandingHeader>Search and find resources...</LandingHeader>
        <LandingSearchInput>
          <SearchBar />
        </LandingSearchInput>
          <LandingLanguageSelectionContainer className="language">
            <Link to="/home">
              <LandingLanguageSelectionButton>English</LandingLanguageSelectionButton>
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
                Español?
              </LandingLanguageSelectionButton>
            </Link>
          </LandingLanguageSelectionContainer>
      </LandingSearchContainer>
    </LandingViewContainer>
  );
};

export default LandingView;
