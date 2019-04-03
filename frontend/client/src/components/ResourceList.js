import React, {useState, useCallback, useEffect} from 'react'
import useFetchSingle from '../functions/useFetchSingle'
import { useStateValue } from '../state/state'

const ResourceList = (props) => {
    console.log(props)
    let [listOfResources] = useState([])
    console.log(props.props.location.pathname)
    let category = null
    let subCat = null
    const newStuff = props.props.location.pathname.split('/')
    category = newStuff[2]
    subCat = newStuff[3]
    let url = `https://empact-e511a.firebaseio.com/${category}/${subCat}.json`
    console.log(url)
    listOfResources = useCallback(useFetchSingle(url))
    // listOfResources = (useFetchSingle(url)
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

export default ResourceList