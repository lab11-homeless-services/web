const modalReducer = (state, action) => {
  switch (action.type) {
    case "setModalDisplay":
      if (state.displayModal === false) {
        return {
          ...state,
          displayModal: true
        };
      }
      return {
        ...state,
        displayModal: false
      };
    default:
      return state;
  }
};

export default modalReducer;
