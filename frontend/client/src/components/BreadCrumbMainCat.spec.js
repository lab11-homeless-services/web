import React from 'react'
import BreadcrumbMainCat from './BreadcrumbMainCat'
import renderer from 'react-test-renderer'
import { render, fireEvent } from 'react-testing-library'


const testProps = {
    cat: 'shelters'
}

describe('<BreadCrumbMainCat />', () => {
    it('BreadCrumbMainCat renders without crashing', () => {
        render(<BreadcrumbMainCat {...testProps}/>)
    })
    it('matches snapshot' ,() => {
        const tree = renderer.create(<BreadcrumbMainCat {...testProps}></BreadcrumbMainCat>)
        expect(tree.toJSON()).toMatchSnapshot()
    })
    it('renders text SHELTER', () => {
        const {getByText} =  render(<BreadcrumbMainCat {...testProps}/>)
        const shelters = getByText('SHELTER')
        expect(shelters).toBeDefined()
    })
})