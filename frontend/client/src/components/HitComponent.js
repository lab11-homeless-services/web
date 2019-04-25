import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const StyledHit = styled.div`
  margin-bottom: 2%;
  font-size: 1.4rem;
  color: white;

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
  }
`;

const HitComponent = props => {
    return (
      <Link to={`/home/shelters/all/${props.hit.linkId}`}>
        <div>
          <StyledHit>{props.hit.name}</StyledHit>
        </div>
      </Link>
    );
};

export default HitComponent
