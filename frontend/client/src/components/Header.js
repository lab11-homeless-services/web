import React from 'react'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state/state'

// class Header extends React.Component {
    

//     render() {
        // return(
        //     <div>
                
        //         <Link to='/home'>{this.props.spanish === true ? <div>Inicio</div> : <div>Home</div>}</Link>
        //         <SearchBar />
        //         <div onClick={this.props.setSpanish}>{ this.props.spanish === true ? <p>English</p> : <p>Español?</p>}</div>
        //     </div>
        // )
//     }
// }

const Header = () => {
    const [{language}, dispatch] = useStateValue()
    return(
        <div>
            <Link to='/home'>{language.spanish === true ? <div>Inicio</div> : <div>Home</div>}</Link>
            <SearchBar />
            <div
                onClick={() => dispatch({
                type: 'setSpanish',
                language
            })}>{language.spanish === true ? <p>English</p> : <p>Español?</p>}</div>
            {console.log(language.spanish)}
        </div>
    ) 
}

export default Header