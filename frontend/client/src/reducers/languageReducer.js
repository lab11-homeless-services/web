import React from 'react'

const languageReducer = (state, action) => {
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


export default languageReducer