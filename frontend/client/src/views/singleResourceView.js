import React from "react";
import Header from "../components/Header.js";
import TabNavforSubView from "../components/TabNavforSubView";
import SingleResource from "../components/SingleResource";
import styled from "styled-components";

const SingleResourceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid blue;
`;

const SingleResourceView = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <SingleResourceContainer>
        <SingleResource props={props} />
      </SingleResourceContainer>
    </div>
  );
};

export default SingleResourceView;
