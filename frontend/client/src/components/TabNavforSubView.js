import React from 'react'
import { Link } from "react-router-dom";
import useFetch from "../functions/useFetch";


const TabNavforSubView = props => { 
   const path = props.props.location.pathname.split('/')
   const cat = path[2]
   const subCats = useFetch(`https://empact-e511a.firebaseio.com/${cat}.json`)
    return(
        <div>
            {Object.keys(subCats).map(subCat => {
                return (
                <div>
                    <Link to={`/home/${cat}/${subCat}`}>{subCat}</Link>
                </div>
                );
            })}
       </div>
    )
}

export default TabNavforSubView