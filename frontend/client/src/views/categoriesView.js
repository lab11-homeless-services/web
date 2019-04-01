import React from 'react'
import Header from '../components/Header'
import ListOfCats from '../components/ListOfCategories'

class CategoriesView extends React.Component {
    render() {
        console.log()
        return(
            <div>
                <Header {...this.props}/>
                <ListOfCats />
            </div>
        )
    }
}

export default CategoriesView