import React from "react";
import ResourceList from "../components/SelectedSubCatList";

const singleResourceView = props => {
  return (
    <div>
      <ResourceList props={props} />
    </div>
  );
};

export default singleResourceView;
