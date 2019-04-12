import React from "react";
//imported components
import Header from "../components/Header.js";
import ListOfCats from "../components/ListOfCategories.js";
import SheltersNearestYou from "../components/ShelterNearestYou";
import Footer from "../components/Footer";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid red;
  max-width: 75%;
  margin: 0 auto;
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
