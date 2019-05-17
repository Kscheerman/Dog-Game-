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


class Game2Logic extends Component {
    consoleLogMethod() {
        console.log("3rndomDogs: ", this.props.randomDogsArray, "3rndomSHFFLDDogs: ", this.props.shuffledArray, "IMAGES: ", this.props.randomImages)
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
        const promises = shuffledArray.map(dog => request.get(`https://dog.ceo/api/breed/${encodeURIComponent(dog)}/images/random`))

        Promise.all(promises).then(responses => {
            const images = responses.map(response => response.body.message)

            this.props.setImages(images)
        })
    }

    answer = (dog) => {
        if (dog.includes(this.props.randomDogsArray[0]) === true) {
            this.props.toggleDisable()
            this.props.setCorrect()
            if(this.props.currentGame !== 3){
                setTimeout(this.newQuestion, 1000)
            }
        } else {
            this.props.toggleDisable()
            this.props.setIncorrect()
            if(this.props.currentGame !== 3) {
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
        const { randomImages } = this.props 
        return (
            <div>
                <p><Link to="/">Go back to the homepage</Link></p>
                <p className="question"> Choose the picture that corresponds with the name of the dogbreed</p>
                <p className='score2'> YOUR SCORE </p>
                 <p className="scoreNum2"> {this.calculateScore()} </p>
                {
                     Array.isArray(randomImages) && randomImages
                        .map((dog, i) => {
                            return (
                                <img
                                    alt="dog"
                                    src={this.props.randomImages[i]}
                                    onClick={() => this.answer(dog)}
                                    disabled={this.props.disable}>
                                </img>
                            )
                        })
                }
                <button className="questionBtn"> {this.props.randomDogsArray[0]} </button>
            </div>


        )
    }
}

const mapStateToProps = function (state) {
    console.log('LOGGING THE PROPS: ', state.images.images)
    return {
        dogBreeds: state.breeds.dogBreeds,
        randomDogsArray: state.breeds.threeRandomDogBreeds,
        shuffledArray: state.breeds.shuffledThreeRandomDogBreeds,
        randomImages: state.images.images,
        correct: state.score.correct,
        incorrect: state.score.incorrect,
        disable: state.score.disable,
        currentGame: state.score.currentGame
    
    }
}


export default connect(mapStateToProps, { setImages, setRandomDogs, setShuffledRandomDogs, setCorrect, setIncorrect, toggleDisable })(Game2Logic)