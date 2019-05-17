import React, { Component } from 'react'
import request from 'superagent'
import DogsList from './DogsList'
import { connect } from 'react-redux'
import { setBreeds } from '../actions/SET_BREEDS'


class DogsListContainer extends Component {
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
    return <DogsList dogBreeds={this.props.dogBreeds} />
  }
}

const mapStateToProps = function (state) {
  return {
    dogBreeds: state.breeds.dogBreeds
  }
}

export default connect(mapStateToProps, { setBreeds })(DogsListContainer);