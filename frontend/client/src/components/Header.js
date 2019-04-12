import React from 'react'
import styled from 'styled-components';
import logo from '../img/logo.png';

import SearchBar from './searchBar'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state/state'

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #414361;
`;

const Logo = styled.img`
  width: 175px;
  height: 50px;
  margin-left: 15px;
`;

const LanguageSelection = styled.div`
  background-color: #ffffff;
  color: #656176;
  width: 129px;
  height: 35px;
  margin-right: 23px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-shadow: 1px 2px 4px 2px #00000050;
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
