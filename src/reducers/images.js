import { SET_IMAGES } from '../actions/SET_IMAGES'

const initialState = {
  images: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload
      }
    default:
      return state
  }
}