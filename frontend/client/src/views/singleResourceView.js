import React from 'react';
import Header from '../components/Header';
import useFetch from '../functions/useFetch'

const singleResourceView = (props) => {
    console.log(props.location.pathname)
    const newStuff = props.location.pathname.split('/')
    console.log(newStuff[2], newStuff[3])
    const listOfResources = useFetch(`https://empact-e511a.firebaseio.com/${newStuff[2]}/${newStuff[3]}.json`)
    console.log(listOfResources)
    return(
        <div>
            {listOfResources.map(resource => (
                <div>
                    {resource.name}
                </div>
            ))}
        </div>
    );
}

export default singleResourceView;