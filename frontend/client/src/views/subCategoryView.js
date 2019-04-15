import React from "react";
//imported components
import Footer from "../components/Footer";
import Header from "../components/Header";
import TabNav from "../components/TabNavigator";
import ResourcesNearestYou from "../components/ResourcesNearestYou";

const subCategoryView = props => {
  return (
    <div>
      <Header />
      <TabNav match={props.match} />
      <ResourcesNearestYou props={props} />
      <Footer />
    </div>
  );
};

export default subCategoryView;
