import React, { useState, Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingView from "./views/landingView";
import CategoriesView from "./views/categoriesView";
import {StateProvider} from './state/state'

class App extends Component {
  render() {
    const initialState = {
      language: {
        spanish: false
      }
    }

    const reducer = (state, action) => {
      switch (action.type) {
        case 'setSpanish':
        if (state.language.spanish === false) {
          return {
            ...state,
            language: {spanish: true}
          }
        }
          return {
            ...state,
            language: {spanish: false}
          }
          default: 
            return state
        }
      }
    
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => (<LandingView {...props}/>)}
          />
          <Route
            path="/home"
            render={props => (<CategoriesView {...props}/>)}
          />
        </div>
      </StateProvider>
    );
  }
}

export default App;
