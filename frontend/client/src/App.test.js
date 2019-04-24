import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme'
import LandingView from './views/landingView'
import App from './App';
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';
import CategoriesView from './views/categoriesView';
import SubCategoryView from './views/subCategoryView'
import SubCategoryList from './views/subCategoryList'
import SingleResourceView from './views/singleResourceView'

Enzyme.configure({ adapter: new Adapter() });


describe('LandingView mounting using memory router', () => {
  it('should render landing view for / router', () => {
    const component = mount(<MemoryRouter initialEntries={['/']}>
        <App />
    </MemoryRouter>)
    console.log(component)
    expect(component.find(LandingView)).toHaveLength(1)
  })
})

describe('CategoriesView mounting using memory router', () => {
  it('should render categories view for /home router', () => {
    const component = mount(<MemoryRouter initialEntries={['/home']}>
        <App />
    </MemoryRouter>)
    console.log(component)
    expect(component.find(CategoriesView)).toHaveLength(1)
  })
})

describe('SubCategoryView mounting using memory router', () => {
  it('should render SubCategories view for /home/shelters router', () => {
    const component = mount(<MemoryRouter initialEntries={['/home/shelters']}>
        <App />
    </MemoryRouter>)
    console.log(component)
    expect(component.find(SubCategoryView)).toHaveLength(1)
  })
})


describe('SubCategoryList mounting using memory router', () => {
  it('should render SubCategorieList view for /home/shelters/men router', () => {
    const component = mount(<MemoryRouter initialEntries={['/home/shelters/men']}>
        <App />
    </MemoryRouter>)
    console.log(component)
    expect(component.find(SubCategoryList)).toHaveLength(1)
  })
})

describe('SingleResourceView mounting using memory router', () => {
  it('should render SingleResourceView view for /home/shelters/men/0 router', () => {
    const component = mount(<MemoryRouter initialEntries={['/home/shelters/men/0']}>
        <App />
    </MemoryRouter>)
    console.log(component)
    expect(component.find(SingleResourceView)).toHaveLength(1)
  })
})

