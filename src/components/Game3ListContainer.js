import React, { Component } from 'react'
import request from 'superagent'
import { connect } from 'react-redux'
import { setBreeds } from '../actions/SET_BREEDS'
import { setImages } from '../actions/SET_IMAGES'
import { setCorrect } from '../actions/SET_CORRECT';
import { setIncorrect } from '../actions/SET_INCORRECT';
import '../CSS/HomePage.css';
import Game2Logic from './Game2Logic';
import Game1Logic from './Game1Logic';

const changeGame = (gameId) => {
    return {
        type: 'CHANGE_GAME',
        payload: gameId
    }
}

class Game3ListContainer extends Component {
    componentDidMount() {
        this.props.changeGame(3)
        request
            .get('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                const breeds = Object.keys(response.body.message)
                return this.props.setBreeds(breeds)
            })
            .catch(console.error)
    }

    componentWillUnmount(){
        this.props.changeGame(null)
    }

    alternateGames = () => {
        const {
            incorrect, 
            correct, 
            dogBreeds
        } = this.props

        console.log(incorrect, correct, dogBreeds)

        const played = incorrect + correct 
        const isOdd = played % 2 


        if (isOdd === 0 && dogBreeds.length !== 0) {
            return <Game1Logic />
        } 

        if (isOdd === 1 && dogBreeds.length !== 0) {
            return <Game2Logic />
        } 


        if (dogBreeds === 0) {
            return <p>loading....</p>
        }

        console.log('YOU GET NOTHING GOOD DAY SIR!')
    }

    render() {
        return (
            <div>
               <p className="gameT"> Provide the correct answers to the alternating games</p>
                {this.alternateGames()}
                
            </div>
           
        )
    }
}
const mapStateToProps = function (state) {
    return {
        dogBreeds: state.breeds.dogBreeds,
        images: state.images.images,
        correct: state.score.correct,
        incorrect: state.score.incorrect
    }
}
export default connect(mapStateToProps, { setBreeds, setCorrect, setIncorrect, changeGame })(Game3ListContainer) 