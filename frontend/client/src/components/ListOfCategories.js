import React from 'react'
import useFetch from '../functions/useFetch'
import { useStateValue } from '../state/state'
import { Link } from 'react-router-dom'

const ListOfCats = () => {
    const [{spanish}] = useStateValue()
    const categoriesEng = useFetch('https://empact-e511a.firebaseio.com/categories.json')
    const categoriesSpa = useFetch('https://empact-e511a.firebaseio.com/categories_espanol.json')
   
    if(spanish.spanish === true) {
        const test = categoriesSpa.category_name
        if (test !== undefined) {
            return(
                <div>
                    {categoriesSpa.category_name.map(category => (
                        <div>
                            {category.toUpperCase()}
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <div>Loading...</div>
        )
    } else {
        const test = categoriesEng.category_name
        if(test !== undefined) {
            return(
                <div>
                    {categoriesEng.category_name.map(category => (
                        <div>
                            <Link to={`/home/${category}`}>
                                {category.toUpperCase()}
                            </Link>
                        </div>
                    ))}
                </div>
            )
        } 
        return (
            <div>Loading...</div>
        )
    }
}

export default ListOfCats