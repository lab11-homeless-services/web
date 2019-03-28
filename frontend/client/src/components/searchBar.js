import React from 'react'

class SearchBar extends React.Component {
    constructor() {
        super()
        this.state = {
            searchInput: ''
        }
    }

    handleChanges = e => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div>
                <input onChange={this.handleChanges} name='searchInput' type="text" value={this.state.searchInput} placeholder='search for resources you need?'/>
            </div>
        )
    }
}

export default SearchBar