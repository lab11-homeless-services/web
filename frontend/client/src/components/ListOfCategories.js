import React from 'react'
import useFetch from '../functions/useFetch'

const ListOfCats = () => {
    const categories = useFetch('https://empact-e511a.firebaseio.com/categories.json')
    const test = categories.category_name
    
    if (test !== undefined) {
        return(
            <div>
                {categories.category_name.map(category => (
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

export default ListOfCats