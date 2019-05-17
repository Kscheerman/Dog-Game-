import React, { Component } from 'react'
import request from 'superagent'
import { connect } from 'react-redux'
import { setBreeds } from '../actions/SET_BREEDS'
import { setImages } from '../actions/SET_IMAGES'

import Game2Logic from './Game2Logic';


class Game2List extends Component {
  componentDidMount() {
    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breeds = Object.keys(response.body.message)
        return this.props.setBreeds(breeds)
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        {this.props.dogBreeds.length === 0 ? <p>loading....</p> : <Game2Logic />}
      </div>
    )
  }
}
const mapStateToProps = function (state) {
  return {
    dogBreeds: state.breeds.dogBreeds,
    images: state.images.images
  }
}
export default connect(mapStateToProps, { setBreeds })(Game2List)

