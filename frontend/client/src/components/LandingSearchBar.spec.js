import React from 'react'
import LandingSearchBar from './LandingSearchBar'
import renderer from 'react-test-renderer'
import { render, fireEvent } from 'react-testing-library'

describe('<LandingSearchBar />', () => {
    it('Header renders without crashing', () => {
        render(<LandingSearchBar />)
    })
    it('matches snapshot' ,() => {
        const tree = renderer.create(<LandingSearchBar></LandingSearchBar>)
        expect(tree.toJSON()).toMatchSnapshot()
    })
})