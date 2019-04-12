import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from 'styled-components';

const TabNav = props => {
    let id = props.match.params.id;
    id = id.replace(/\s+/g, "_");

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);

    // Use fetch returns an Object, so Object.keys is used to map over the object's keys
    return (
      <div className='tabcontainer'>
      {Object.keys(subCats).map(subCat => {
        return (
          <div>
            <Tabs>
              <Link to={`/home/${id}/${subCat}`}>{subCat}</Link>
            </Tabs>
          </div>
        );
      })}
    </div>
  );
};

export default TabNav;

const Tabs = styled.a `
  padding: 10px 25px;
  margin: 0 60px;
  border: #9B9B9B solid 1px;
}
`;

