import React, { Component } from 'react'
import request from 'superagent'
import { connect } from 'react-redux'
import { setBreeds } from '../actions/SET_BREEDS'
import { setImages } from '../actions/SET_IMAGES'

import Game1Logic from './Game1Logic';


class Game1ListContainer extends Component {
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
    return (<div>
      {this.props.dogBreeds.length === 0 ? <p>loading....</p> : <Game1Logic />}
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
export default connect(mapStateToProps, { setBreeds })(Game1ListContainer)

