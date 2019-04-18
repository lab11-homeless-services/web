import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";
import touch from "../img/touch.png";

import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";

const HeaderContainer = styled.div`
  width: 100%;
  height: 150px;
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
  width: 60%;
  height: 50px;
  margin-left: 3%;

  @media (max-width: 600px) {
    margin: 15px 22%;
    width: 55%;
  }
`;

const LanguageSelection = styled.div`
  display: none;
  background-color: #ffffff;
  color: #656176;
  width: 5%;
  height: 35px;
  margin-right: 2%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-shadow: 1px 2px 4px 2px #00000050;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LanguageSelectionImage = styled.img`
  height: 20px;
  width: 10%;
  margin-left: 2%;
  display: none;
`;

const Header = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} />
        {/* {spanish.spanish === true ? <div>Inicio</div> : <div>Home</div>} */}
      </Link>
      <SearchBar />
      {/* <LanguageSelection
        onClick={() =>
          dispatch({
            type: "setSpanish",
            spanish
          })
        }
      >
        {spanish.spanish === true ? <p>English</p> : <p>Español?</p>}
        <LanguageSelectionImage src={touch} />
      </LanguageSelection> */}
    </HeaderContainer>
  );
};

export default Header;
