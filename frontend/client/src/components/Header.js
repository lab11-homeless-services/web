import React from "react";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";

const Header = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <div>
      <Link to="/home">
        {spanish.spanish === true ? <div>Inicio</div> : <div>Home</div>}
      </Link>
      <SearchBar />
      <div
        onClick={() =>
          dispatch({
            type: "setSpanish",
            spanish
          })
        }
      >
        {spanish.spanish === true ? <p>English</p> : <p>Español?</p>}
      </div>
    </div>
  );
};

export default Header;
