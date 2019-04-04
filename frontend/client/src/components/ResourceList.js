import React, {useState, useCallback, useEffect} from 'react'
import useFetchSingle from '../functions/useFetchSingle'
import { useStateValue } from '../state/state'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

const ResourceList = (props) => {

    // console.log(props)
    let [listOfResources] = useState([])
    // console.log(props.props.location.pathname)
    let category = null
    let subCat = null
    const newStuff = props.props.location.pathname.split('/')
    category = newStuff[2]
    subCat = newStuff[3]
    let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`
    // console.log(url)
    listOfResources = useCallback(useFetchSingle(url));
    // listOfResources = (useFetchSingle(url)
    // console.log(listOfResources)

    const subCatResource = firebase.database().ref(`/${category}/${subCat}`);
    // console.log('subCatResource', subCatResource);

    let id = 0;
    
        return(
            <div>
                {listOfResources.map(resource => {
                    let singleResource = subCatResource.push();
                    let key = singleResource.key;
                    // console.log('singleResource', singleResource.key);
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