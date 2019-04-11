import React from "react";

import ResourceList from "../components/ResourceList"
import TabNav from "../components/TabNavigator"
import TabNavforSubView from '../components/TabNavforSubView'

const SubCategoryList = props => {
  return (
    <div>
      {/* <TabNav props={props.match} /> */}
      <TabNavforSubView props={props}/>
      <ResourceList props={props} />
    </div>
  );
};

export default SubCategoryList;
