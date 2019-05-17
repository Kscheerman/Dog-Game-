export const SET_SHUFFLED_DOGS = 'SET_SHUFFLED_DOGS'
export function setShuffledRandomDogs(shuffledThreeRandomDogBreeds) {
  return {
    type: 'SET_SHUFFLED_DOGS',
    payload: shuffledThreeRandomDogBreeds
  }
}