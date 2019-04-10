import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../functions/useFetch";
import ListOfResources from "./ListOfResources";

const TabNav = props => {
  let id = props.match.params.id;

  //replacing spaces with _
  id = id.replace(/\s+/g, "_");

  const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

  // Use fetch returns an Object, so Object.keys is used to map over the object's keys
  return (
    <div>
      {Object.keys(subCats).map(subCat => {
        return (
          <div>
            <Link to={`/home/${id}/${subCat}`}>{subCat}</Link>
            <ListOfResources id={id} subCat={subCat} props={props} />
          </div>
        );
      })}
    </div>
  );
};

export default TabNav;
