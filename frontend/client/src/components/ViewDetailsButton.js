import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DetailsButton = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  background-color: #414361;
  border-radius: 5px;
  height: 40px;
  width: 165px;
  margin: 10px 0 0 0;
  padding: 0 10px 0 5px;
  font-size: .9rem;
  font-weight: bold;
  box-shadow: 1px 1px 4px 2px #00000050;
`;

const ViewDetailsButton = props => {
  const id = props.props;
  return (
    <Link to={`/home/shelters/all/${id}`}>
      <DetailsButton>
        <i class="fas fa-external-link-alt" />
        VIEW DETAILS
      </DetailsButton>
    </Link>
  );
};

export default ViewDetailsButton;
