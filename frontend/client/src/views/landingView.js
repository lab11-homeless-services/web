import React from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";
import { useStateValue } from "../state/state";
import Footer from "../components/Footer";

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
      <Footer />
    </div>
  );
};

export default LandingView;
