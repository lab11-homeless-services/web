import React, { useReducer } from 'react';
import { Link } from 'react-router-dom'
import useFetch from '../functions/useFetch';
import ListOfResources from './ListOfResources'

const TabNav = (props) => {
    let id = props.match.params.id
    id = id.replace(/\s+/g, '_')

    const subCats = useFetch(`https://empact-e511a.firebaseio.com/${id}.json`);
    // console.log('subCats', subCats)
    // console.log('props', props.match.params.id)
    

    return(

        <div>
            {Object.keys(subCats).map(subCat => { 
                
                return (
                <div>
                    <Link to={`/home/${id}/${subCat}`}>{subCat}</Link>
                    <ListOfResources id={id} subCat={subCat} props={props}/>
                </div>
                )
            })}
        </div>
    );
}

export default TabNav;

// str = str.replace(/\s+/g, '')