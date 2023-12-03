import * as types from "./actiontype";
const initialState1 = {
    Student: [],
    isLoading: false,
    isError: false,
  };

export const reducer = (state = initialState1, action) => {
    const { type, payload } = action;
    switch (type) {
      case types.GET_Student_REQUEST:
      case types.POST_Student_REQUEST:
      case types.DELETE_Student_REQUEST:  
      case types.EDIT_Student_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case types.GET_Student_SUCCESS:
      case types.POST_Student_SUCCESS:
        case types.DELETE_Student_SUCCESS:  
        case types.EDIT_Student_SUCCESS: 
        return {
          ...state,
          Student: payload,
          isLoading: false,
          isError: false,
        };
      case types.GET_Student_FAILURE:
      case types.POST_Student_FAILURE:
        case types.DELETE_Student_FAILURE:  
        case types.EDIT_Student_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
  
  
      default:
        return state;
    }
  };