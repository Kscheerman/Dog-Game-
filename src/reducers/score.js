import { SET_CORRECT } from '../actions/SET_CORRECT'
import { SET_INCORRECT } from '../actions/SET_INCORRECT'
import { TOGGLE_DISABLE } from '../actions/TOGGLE_DISABLE'

const initialState = {
  correct: 0,
  incorrect: 0,
  disable: true,
  currentGame: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_GAME':
    return {
      ...state,
      currentGame: action.payload 
    }
    case SET_CORRECT:
      return {
        ...state,
        correct: state.correct + 1
      }
    case SET_INCORRECT:
      return {
        ...state,
        incorrect: state.incorrect + 1
      }
    case TOGGLE_DISABLE:
      return {
        ...state,
        disable: !state.disable
      }
    default:
      return state
      }
  }