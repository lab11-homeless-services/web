import React, { useState } from "react";
import useFetchSingle from "../functions/useFetchSingle";
import { Link } from "react-router-dom";

const ResourceList = props => {
  //Setting List of resources on state as an empty array
  let [listOfResources] = useState([]);

  const paths = props.props.location.pathname.split("/");
  let category = paths[2];
  let subCat = paths[3];
  let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`;

  //   listOfResources = useCallback(useFetchSingle(url));
  listOfResources = useFetchSingle(url);

  // Created an id to reference a resources that auto increments
  let id = 0;

  return (
    <div>
      {listOfResources.map(resource => {
        let resourceId = id;
        id++;
        return (
          <div>
            <Link to={`/home/${category}/${subCat}/${resourceId}`}>
              {resource.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ResourceList;
