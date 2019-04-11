import React from "react";
import useFetchSingle from "../functions/useFetchSingle";

const SingleResourceView = props => {
  //Splits path name at backslash
  const paths = props.location.pathname.split("/");

  //Accesses each piece of the pathname from the array createdabove
  const category = paths[2];
  const subCat = paths[3];
  const singleResource = paths[4];

  //Fetching a Single Resource
  const resource = useFetchSingle(
    `https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`
  );

  if (resource.details !== undefined && resource.services !== undefined) {
    return (
      <div>
        <p>{resource.name}</p>
        <p>{resource.address}</p>
        <p>{resource.city}</p>
        <h4>Details</h4>
        {resource.details.map(detail => (
          <p>{detail}</p>
        ))}
        <h4>Services</h4>
        {resource.services.map(service => (
          <p>{service}</p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>{resource.name}</p>
        <p>{resource.address}</p>
        <p>{resource.city}</p>
      </div>
    );
  }
};

export default SingleResourceView;
