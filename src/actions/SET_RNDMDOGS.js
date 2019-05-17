export const SET_RNDMDOGS = 'SET_RNDMDOGS'
export function setRandomDogs(arrayOfRndmDogs) {
  return {
    type: 'SET_RNDMDOGS',
    payload: arrayOfRndmDogs
  }
}