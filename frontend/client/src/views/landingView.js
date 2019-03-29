import React, { Fragment } from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";

class LandingView extends React.Component {
  render() {
    console.log(this.props.spanish);
    return (
      <div>
        <SearchBar />
        <div className="language">
          <Link to="/home">
            <div>English</div>
          </Link>
          <Link to="/home">
            <div onClick={this.props.setSpanish}>Español?</div>
          </Link>
          <div>Is this Test Div working and Testing Travis? Let's hope...</div>
        </div>
      </div>
    );
  }
}

export default LandingView;
