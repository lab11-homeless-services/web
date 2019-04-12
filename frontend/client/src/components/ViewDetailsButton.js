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
  height: 25px;
  width: 100%;
  margin-top: 10px;
`;

const ViewDetailsButton = props => {
  const id = props.props;
  return (
    <Link to={`/home/shelters/all/${id}`}>
      <DetailsButton>
        <i class="fas fa-external-link-alt" />
        View Details
      </DetailsButton>
    </Link>
  );
};

export default ViewDetailsButton;
