import React, { useReducer } from "react";
import useFetchSingle from "../functions/useFetchSingle";
import Header from "../components/Header.js";
import TabNavforSubView from "../components/TabNavforSubView";
import SingleResource from "../components/SingleResource";

const SingleResourceView = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <SingleResource props={props} />
    </div>
  );
};

export default SingleResourceView;
