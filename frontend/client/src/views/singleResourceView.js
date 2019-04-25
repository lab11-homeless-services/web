// importing React
import React from "react";

// importing components
import Header from "../components/Header.js";
import TabNavforSubView from "../components/TabNavforSubView";
import SingleResource from "../components/SingleResource";
import Footer from "../components/Footer";

// styles
import styled from "styled-components";

const SingleResourceContainer = styled.div`
  max-width: 1366px;
  width: 94%;
  display: flex;
  margin: 0 auto;
`;

const SingleResourceView = props => {
  return (
    <div>
      <Header />
      <TabNavforSubView props={props} />
      <SingleResourceContainer>
        <div className="single-resource-container">
          <SingleResource props={props} />
        </div>
      </SingleResourceContainer>
      <Footer />
    </div>
  );
};

export default SingleResourceView;
