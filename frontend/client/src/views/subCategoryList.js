// importing React
import React from "react";

// importing components
import Header from "../components/Header.js";
import ResourceList from "../components/ResourceList";
import TabNavforSubView from "../components/TabNavforSubView";

const SubCategoryList = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <ResourceList props={props} />
    </div>
  );
};

export default SubCategoryList;
