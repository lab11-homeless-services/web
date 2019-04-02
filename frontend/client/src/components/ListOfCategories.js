import React from 'react'
import useFetch from '../functions/useFetch'
import { useStateValue } from '../state/state'

const ListOfCats = () => {
    const [{language}] = useStateValue()
    const categoriesEng = useFetch('https://empact-e511a.firebaseio.com/categories.json')
    const categoriesSpa = useFetch('https://empact-e511a.firebaseio.com/categories_espanol.json')
    console.log(language.spanish)

    if(language.spanish === true) {
        const test = categoriesSpa.category_name
        if (test !== undefined) {
            return(
                <div>
                    {categoriesSpa.category_name.map(category => (
                        <div>
                            {category}
                        </div>
                    ))}
                </div>
            )
        }
        return (
            <div>Loading</div>
        )
    } else {
        const test = categoriesEng.category_name
        if(test !== undefined) {
            return(
                <div>
                    {categoriesEng.category_name.map(category => (
                        <div>
                            {category}
                        </div>
                    ))}
                </div>
            )
        } 
        return (
            <div>Loading</div>
        )
        

    }
    
}

export default ListOfCats