import { combineReducers } from 'redux'
import images from './images'
import breeds from './breeds'
import score from './score'

export default combineReducers({
  breeds,
  images,
  score
})