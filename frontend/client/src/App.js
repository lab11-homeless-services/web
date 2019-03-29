import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import LandingView from './views/landingView'
import CategoriesView from './views/categoriesView'

class App extends Component {
  constructor() {
    super();
    this.state = {
        spanish: false
    }
  }

  setSpanish = () => {
    if (this.state.spanish === false) {
      this.setState({
        spanish: true
      })
    } else {
      this.setState({
        spanish: false
      })
    }
    
  }

  render() {
    return (
      <div className="App">
      <Route exact path='/' render={props => ( <LandingView  {...props} setSpanish={this.setSpanish} spanish={this.state.spanish}/>)}/>
      <Route path='/home' render={props => ( <CategoriesView  {...props} setSpanish={this.setSpanish} spanish={this.state.spanish}/>)} />
      </div>
    );
  }
}

export default App;
