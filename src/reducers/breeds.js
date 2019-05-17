import { SET_BREEDS } from '../actions/SET_BREEDS'
import { SET_RNDMDOGS } from '../actions/SET_RNDMDOGS'
import { SET_SHUFFLED_DOGS } from '../actions/SET_SHUFFLED_DOGS'

const initialState = {
  dogBreeds: [],
  threeRandomDogBreeds: [],
  shuffledThreeRandomDogBreeds: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BREEDS:
      return {
        ...state,
        dogBreeds: action.payload
      };
    case SET_RNDMDOGS:
      return {
        ...state,
        threeRandomDogBreeds: action.payload
      }
    case SET_SHUFFLED_DOGS:
      return {
        ...state,
        shuffledThreeRandomDogBreeds: action.payload
      }
    default:
      return state
  }
}

