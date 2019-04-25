// React/ React Hooks
import React from "react";
import { Link } from "react-router-dom";
//Required to gain accesss to global state
import { useStateValue } from "../state/state";

//Styles and images
import styled from "styled-components";
import logo from "../img/logo.png";
import touch from "../img/touch.png";

//Searchbar component
import SearchBar from "./searchBar";


const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #414361;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 178px;
  }
`;

const Logo = styled.img`
  width: 185px;
  margin-left: 3%;
  @media (max-width: 600px) {
    margin: 15px 22%;
    margin-left: 0;
  }
  @media print {
    display: none;
  }
`;


const Header = () => {
  //Gains access to reducers and state
  // const [{ spanish }, dispatch] = useStateValue();

  // Commented out code below is associated with global language selection for spanish. Code within
  // link simply changes text between english and spanish for home
  // onClick below calls the dispatch function to change global language to spanish.

  return (
    <HeaderContainer>
      <Link to="/home">
        <Logo src={logo} />
        {/* {spanish.spanish === true ? <div>Inicio</div> : <div>Home</div>} */}
      </Link>
      <SearchBar />
      {/* <div
        onClick={() =>
          dispatch({
            type: "setSpanish",
            spanish
          })
        }
      >
        {spanish.spanish === true ? <p>English</p> : <p>Español?</p>}
        <img src={touch} />
      </div> */}
    </HeaderContainer>
  );
};

export default Header;
