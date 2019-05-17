import React, { Component } from 'react';
import Game1ListContainer from './Game1ListContainer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent'
import { setImages } from '../actions/SET_IMAGES'
import { setRandomDogs } from '../actions/SET_RNDMDOGS'
import { setShuffledRandomDogs } from '../actions/SET_SHUFFLED_DOGS'
import { setCorrect } from '../actions/SET_CORRECT';
import { setIncorrect } from '../actions/SET_INCORRECT';
import { toggleDisable } from '../actions/TOGGLE_DISABLE'


class Game1Logic extends Component {
    consoleLogMethod() {
        console.log("LOG: ConsoleLogMethod", this.props.randomDogsArray, this.props.shuffledArray, this.props.randomImage)
    }


    componentDidMount() {
        this.newQuestion()
    }

    setupGame = () => {
        const dogData = this.props.dogBreeds
        let rand = dogData[Math.floor(Math.random() * dogData.length)];

        let rand2 = dogData[Math.floor(Math.random() * dogData.length)];

        let rand3 = dogData[Math.floor(Math.random() * dogData.length)];

        if (rand === rand2) {
            rand2 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand === rand2) {
            rand2 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand === rand2) {
            rand2 = dogData[Math.floor(Math.random() * dogData.length)];
        }

        if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        } else if (rand3 === rand2 || rand3 === rand) {
            rand3 = dogData[Math.floor(Math.random() * dogData.length)];
        }
        const randomArray = [rand, rand2, rand3]
        const website = `https://dog.ceo/api/breed/${encodeURIComponent(rand)}/images/random`

        return this.props.randomDogsArray.splice(0, this.props.randomDogsArray.length, ...randomArray)
    }

    shuffleButtons(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    newQuestion = () => {
        this.setupGame();
        this.props.toggleDisable()
        const shuffledArray = this.shuffleButtons(this.props.randomDogsArray);
        this.props.setShuffledRandomDogs(shuffledArray);
        this.consoleLogMethod();
        this.calculateScore();
        request
            .get(`https://dog.ceo/api/breed/${encodeURIComponent(this.props.randomDogsArray[0])}/images/random`)
            .then(response => {
                const randomImage = (response.body.message)
                console.log(randomImage)
                return this.props.setImages(randomImage)
            })
            .catch(console.error)
    }

    answer = (dog) => {
        if (dog === this.props.randomDogsArray[0]) {
            this.props.toggleDisable()
            this.props.setCorrect()
            if(this.props.currentGame !== 3){
                setTimeout(this.newQuestion, 1000)
            }
        } else {
            this.props.toggleDisable()
            this.props.setIncorrect()
            if(this.props.currentGame !== 3){
                setTimeout(this.newQuestion, 2000)
            }
        }

    }
    calculateScore() {
        if (this.props.correct === 0) {
            return "0%"
        }
        else {
            let totalAnswers = this.props.correct + this.props.incorrect
            let percentage = (this.props.correct / totalAnswers) * 100 + "%"
            return percentage
        }
    }

    render() {
        return (
            <div>
                <p><Link to="/">Go back to the homepage</Link></p>
                <p className="question">What is the breed of this dog?</p>
                <p className="score"> YOUR SCORE </p>
                  <p className="scoreNum"> {this.calculateScore()} </p>
                <img src={this.props.randomImage} alt="dog"></img>
                {
                    this
                        .props
                        .shuffledArray
                        .map(dog => {
                            return <p>
                                <button
                                    onClick={() => this.answer(dog)}
                                    disabled={this.props.disable}
                                >
                                    {dog}
                                </button>
                            </p>
                        })
                }

                        
            </div>


        )
    }
}

const mapStateToProps = function (state) {
    console.log('LOGGING THE STATE: ', state);
    return {
        dogBreeds: state.breeds.dogBreeds,
        randomDogsArray: state.breeds.threeRandomDogBreeds,
        shuffledArray: state.breeds.shuffledThreeRandomDogBreeds,
        randomImage: state.images.images,
        correct: state.score.correct,
        incorrect: state.score.incorrect,
        disable: state.score.disable,
        currentGame: state.score.currentGame,
    }
}


export default connect(mapStateToProps, { setImages, setRandomDogs, setShuffledRandomDogs, setCorrect, setIncorrect, toggleDisable })(Game1Logic)