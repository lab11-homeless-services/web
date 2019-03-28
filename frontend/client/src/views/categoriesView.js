import React from 'react'
import Header from '../components/Header'

class CategoriesView extends React.Component {
    render() {
        console.log()
        return(
            <div>
                <Header {...this.props}/>
            </div>
        )
    }
}

export default CategoriesView