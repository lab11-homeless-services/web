import React from 'react'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    

    render() {
        console.log(this.props)
        return(
            <div>
                
                {this.props.spanish === true ? <div>Inicio</div> : <div>Home</div>}
                <SearchBar />
                <div onClick={this.props.setSpanish}>{ this.props.spanish === true ? <p>English</p> : <p>Español?</p>}</div>
            </div>
        )
    }
}

export default Header