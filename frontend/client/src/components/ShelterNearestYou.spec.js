import React from 'react'
import ShelterNearestYou from './ShelterNearestYou'
import renderer from 'react-test-renderer'
import { render, fireEvent } from 'react-testing-library'

describe('<LandingSearchBar />', () => {
    it('Header renders without crashing', () => {
       const {getByText} = render(<ShelterNearestYou />)
       const map = getByText('Loading...')
        expect(map).toBeTruthy()
    })
    it('matches snapshot' ,() => {
        const tree = renderer.create(<ShelterNearestYou></ShelterNearestYou>)
        expect(tree.toJSON()).toMatchSnapshot()
    })
})