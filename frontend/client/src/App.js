import React, { useState, Component } from "react";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import LandingView from "./views/landingView";
import CategoriesView from "./views/categoriesView";
import SubCategoryView from './views/subCategoryView';
import SubCategoryList from './views/subCategoryList';
import {StateProvider} from './state/state'
import languageReducer from './reducers/languageReducer'
import ListOfResources from "./components/ListOfResources";
import SingleResourceView from './views/singleResourceView';
import * as firebase from 'firebase';

class App extends Component {

  render() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCAq8hud84J37D5gyYY0KscH4kY85Y61II',                        
      databaseURL: 'https://empact-e511a.firebaseio.com/',
    });

    const initialState = {
        spanish: false,
    }


    const mainReducer = ( {spanish} , action) => ({
      spanish: languageReducer(spanish, action),
    });

  
    
    return (
      <StateProvider initialState={initialState} reducer={mainReducer}>
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
            render={props => (<SubCategoryList {...props} />)}
          />
          <Route
            path='/home/:id/:id/:id'
            render={props => (<SingleResourceView {...props} />)}
          />
        </div>
      </StateProvider>
    );
  }
}

export default App;
