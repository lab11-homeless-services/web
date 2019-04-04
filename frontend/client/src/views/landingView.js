import React, { Fragment } from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";

const LandingView = () => {
  //Gains access to reducers and state
  const [{ spanish }, dispatch] = useStateValue();

  return (
    <div>
      <SearchBar />
      <div className="language">
        <Link to="/home">
          <div>English</div>
        </Link>
        <Link to="/home">
          <div
            spanish={spanish.spanish}
            onClick={() =>
              dispatch({
                type: "setSpanish",
                language: true
              })
            }
          >
            Español?
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LandingView;
