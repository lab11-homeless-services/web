import React, { useState, useCallback } from 'react';
import useFetchSingle from '../functions/useFetchSingle';
import { Link } from 'react-router-dom';

const ResourceList = (props) => {

    let [listOfResources] = useState([])
    let category = null
    let subCat = null
    const newStuff = props.props.location.pathname.split('/')
    category = newStuff[2]
    subCat = newStuff[3]
    let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`
    listOfResources = useCallback(useFetchSingle(url));
   
    let id = 0;
    
        return(
            <div>
                {listOfResources.map(resource => {
                    let resourceId = id
                    id++;
                    return(
                    <div>
                        <Link to={`/home/${category}/${subCat}/${resourceId}`}>
                            {resource.name}
                        </Link>
                    </div>
                    );
                })}
            </div>
        );
}

export default ResourceList