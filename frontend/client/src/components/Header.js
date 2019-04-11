import React from 'react'
import styled from 'styled-components';
import logo from '../img/logo.png';

import SearchBar from './searchBar'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state/state'

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #414361;
`;

const Logo = styled.img`
  width: 125px;
  height: 50px;
  margin-left: 10px;
`;

const LanguageSelection = styled.div`
  background-color: #ffffff;
  color: #656176;
  width: 95px;
  height: 25px;
  margin-right: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const Header = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <HeaderContainer>
      <Link to="/home">
      <Logo src={logo} />
        {/* {spanish.spanish === true ? <div>Inicio</div> : <div>Home</div>} */}
      </Link>
      <SearchBar />
      <LanguageSelection
        onClick={() =>
          dispatch({
            type: "setSpanish",
            spanish
          })
        }
      >
        {spanish.spanish === true ? <p>English</p> : <p>Español?</p>}
      </LanguageSelection>
    </HeaderContainer>
  );
};

export default Header;
