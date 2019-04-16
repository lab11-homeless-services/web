import React from 'react'
import { Link } from "react-router-dom";
import useFetch from "../functions/useFetch";
import styled from "styled-components";


const TabNavforSubView = props => {
   const path = props.props.location.pathname.split('/')
   const cat = path[2]
   const subCats = useFetch(`https://empact-e511a.firebaseio.com/${cat}.json`)
    return(
        <TabContainer>
        <i class="fas fa-arrow-left"></i>
        <div className='back2cat'>
          <a>Back to Categories</a>
        </div>
            {Object.keys(subCats).map(subCat => {
                return (
                <div>
                    <Link to={`/home/${cat}/${subCat}`}>{subCat}</Link>
                </div>
                );
            })}
       </TabContainer>
    )
}

export default TabNavforSubView

const TabContainer = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 18px;
  display: flex;
  justify-content: left;
  align-items: center; 
`