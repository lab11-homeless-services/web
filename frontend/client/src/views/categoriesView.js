import React from "react";
//imported components
import Header from "../components/Header.js";
import ListOfCats from "../components/ListOfCategories.js";
import SheltersNearestYou from "../components/ShelterNearestYou";

const CategoriesView = props => {
  return (
    <div>
      <Header />
      <ListOfCats />
      <SheltersNearestYou />
      {/* will want a footer component as well */}
    </div>
  );
};

export default CategoriesView;
