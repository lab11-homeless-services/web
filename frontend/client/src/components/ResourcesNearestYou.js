import React from 'react';

import useFetchSingle from '../functions/useFetchSingle';

const ResourcesNearestYou = props => {
    console.log('resource props', props);

    const paths = props.props.location.pathname.split('/');
    const category = paths[2];

    let resources = useFetchSingle(`https://empact-e511a.firebaseio.com/${category}/all.json`);
    console.log('resources', resources);
    console.log('paths', paths);
    return (
        <div>
           nope
        </div>
    );
}

export default ResourcesNearestYou;