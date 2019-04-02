import React from 'react'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom'
import { useStateValue } from '../state/state'

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