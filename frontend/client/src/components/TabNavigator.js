import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../functions/useFetch";

const TabNav = props => {
  console.log(props)
  if (props.props) {
    console.log(props.props)
    let paths = props.props.location.pathname
    const pather = paths.split('/')
    const dog = pather[2]
    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${dog}.json`);

  // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <div>
        {Object.keys(subCats).map(subCat => {
          return (
            <div>
              <Link to={`/home/${dog}/${subCat}`}>{subCat}</Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    let id = props.match.params.id;
    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <div>
      {Object.keys(subCats).map(subCat => {
        return (
          <div>
            <Link to={`/home/${id}/${subCat}`}>{subCat}</Link>
          </div>
        );
      })}
    </div>
  );
  }
  

  //replacing spaces with _
  
};

export default TabNav;
