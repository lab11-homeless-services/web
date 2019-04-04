
const languageReducer = (state, action) => {
    switch (action.type) {
      case 'setSpanish':
      if (state.spanish === false) {
        return {
          ...state,
          spanish: true
        }
      }
        return {
          ...state,
          spanish: false
        }
        default: 
          return state
      }
    }


export default languageReducer