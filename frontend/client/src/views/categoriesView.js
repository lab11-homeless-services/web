import React from "react";
//imported components
import Header from "../components/Header.js";
import ListOfCats from "../components/ListOfCategories.js";
import SheltersNearestYou from "../components/ShelterNearestYou";
import Footer from "../components/Footer";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  max-width: 1366px;
  width: 98%;
  margin: 0 auto;
  padding-right: 1%;
  @media(max-width: 1024px) {
    flex-direction: column;
  }
`;

const CategoriesView = props => {
  return (
    <div>
      <Header />
      <InfoContainer>
        <ListOfCats />
        <SheltersNearestYou />
      </InfoContainer>
      <Footer />
    </div>
  );
};

export default CategoriesView;
