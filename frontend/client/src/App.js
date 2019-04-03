import React, { useState, Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingView from "./views/landingView";
import CategoriesView from "./views/categoriesView";
import SubCategoryView from './views/subCategoryView';
import SingleResourceView from './views/singleResourceView';
import {StateProvider} from './state/state'
import languageReducer from './reducers/languageReducer'
import ListOfResources from "./components/ListOfResources";
import { red } from "ansi-colors";

class App extends Component {
  render() {
    const initialState = {
      language: {
        spanish: false,
      }
    }

    // const reducer = (state, action) => {
    //   switch (action.type) {
    //     case 'setSpanish':
    //     if (state.language.spanish === false) {
    //       return {
    //         ...state,
    //         language: {spanish: true}
    //       }
    //     }
    //       return {
    //         ...state,
    //         language: {spanish: false}
    //       }
    //       default: 
    //         return state
    //     }
    //   }

    
    return (
      <StateProvider initialState={initialState} reducer={languageReducer}>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => (<LandingView {...props}/>)}
          />
          <Route
            exact
            path="/home"
            render={props => (<CategoriesView {...props}/>)}
          />
          <Route
            path='/home/:id'
            render={props => (<SubCategoryView {...props}/>)}
          />
          <Route 
            path='/home/:id/:id'
            render={props => (<SingleResourceView {...props} />)}
          />
        </div>
      </StateProvider>
    );
  }
}

export default App;
