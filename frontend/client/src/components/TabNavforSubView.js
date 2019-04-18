import React from 'react'
import { NavLink } from "react-router-dom";
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
          <NavLink to={`/home/`}>Back to Categories</NavLink>
        </div>
            {Object.keys(subCats).map(subCat => {
                return (
                <div>
                    <NavLink to={`/home/${cat}/${subCat}`}>{subCat}</NavLink>
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