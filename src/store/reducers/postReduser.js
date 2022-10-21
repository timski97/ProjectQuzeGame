import {GET_QUESTIONS} from '../actions/postActions';

const initialState = {
  questions: [],
};
export const useReducer = (state = initialState, action) => {
  // console.log('action',action)
  switch (action.type) {
    case GET_QUESTIONS:
      return {...state, questions: action.payload};
    default:
      return state;
  }
};
