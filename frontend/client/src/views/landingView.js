import React, { Fragment } from "react";
import SearchBar from "../components/searchBar";
import { Link } from "react-router-dom";

class LandingView extends React.Component {
  constructor() {
    super();
    this.state = {
      spanish: false
    };
  }

  setSpanish = e => {
    this.setState({
      spanish: true
    });
  };

  render() {
    return (
      <div>
        <SearchBar />
        <div className="language">
          <Link to="/home">
            <div>English</div>
          </Link>
          <Link to="/home">
            <div onClick={this.setSpanish}>Español?</div>
          </Link>
        </div>
        <div>Hey is this div rendering? -Josh</div>
      </div>
    );
  }
}

export default LandingView;
