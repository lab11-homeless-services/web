import React from "react";

import ResourceList from "../components/ResourceList"
import TabNavforSubView from '../components/TabNavforSubView'

const SubCategoryList = props => {
  return (
    <div>
      <TabNavforSubView props={props}/>
      <ResourceList props={props} />
    </div>
  );
};

export default SubCategoryList;
