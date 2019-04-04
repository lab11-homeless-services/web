import React from 'react';
import useFetchSingle from '../functions/useFetchSingle';

const SingleResourceView = props => {
    const newStuff = props.location.pathname.split('/');
    const category = newStuff[2];
    const subCat = newStuff[3];
    const singleResource = newStuff[4];

    const resource = useFetchSingle(`https://empact-e511a.firebaseio.com/${category}/${subCat}/${singleResource}.json`);

    return(
        <div>
            <p>{resource.name}</p>
            <p>{resource.address}</p>
            <p>{resource.city}</p>
        </div>
    );
}

export default SingleResourceView;