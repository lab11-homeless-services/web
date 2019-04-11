import React from 'react'
import { Link } from "react-router-dom";
import useFetch from "../functions/useFetch";


const TabNavforSubView = props => {
    console.log(props)
   const path = props.props.location.pathname.split('/')
   console.log(path, 'here')
   const cat = path[2]
   const subCats = useFetch(`https://empact-e511a.firebaseio.com/${cat}.json`)
   console.log(subCats)
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