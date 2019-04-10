import React from "react";
import Header from "../components/Header";
import TabNav from "../components/TabNavigator";
import ResourcesNearestYou from "../components/ResourcesNearestYou";

const subCategoryView = props => {
  console.log('subCat props', props);
  return (
    <div>
      <Header />
      <TabNav match={props.match} />
      <ResourcesNearestYou props={props} />
    </div>
  );
};

export default subCategoryView;
