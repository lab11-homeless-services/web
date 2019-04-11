import React from "react";
//imported components
import Header from "../components/Header.js";
import ListOfCats from "../components/ListOfCategories.js";
import SheltersNearestYou from "../components/ShelterNearestYou";
import Footer from "../components/Footer";
const CategoriesView = props => {
  return (
    <div>
      <Header />
      <ListOfCats />
      <SheltersNearestYou />
      <Footer />
    </div>
  );
};

export default CategoriesView;
