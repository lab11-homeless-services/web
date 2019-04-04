import React from 'react'
import Header from '../components/Header'
import TabNav from '../components/TabNavigator'

const subCategoryView = (props) => {
    return(
        <div>
            <Header />
            <TabNav match={props.match} />
        </div>
    )
}

export default subCategoryView