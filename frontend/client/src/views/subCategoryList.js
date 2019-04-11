import React from "react";

import ResourceList from "../components/ResourceList"
import TabNav from "../components/TabNavigator"

const SubCategoryList = props => {
  return (
    <div>
      <TabNav props={props.match} />
      <ResourceList props={props} />
    </div>
  );
};

export default SubCategoryList;
