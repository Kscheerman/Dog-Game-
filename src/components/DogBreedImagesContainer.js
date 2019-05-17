import React, { Component } from 'react'
import DogBreedImages from './DogBreedImages'
import request from 'superagent'
import { connect } from 'react-redux'
import { setImages } from '../actions/SET_IMAGES'

class DogsListContainer extends Component {
  state = { images: null }

  componentDidMount() {
    const breed = this.props.match.params.breed
    request
      .get(`https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`)
      .then(response => this.props.setImages(response.body.message.slice(0, 10)))
      .catch(console.error)
  }



  render() {
    return <DogBreedImages images={this.props.images} breed={this.props.match.params.breed} />
  }
}

const mapStateToProps = function (state) {
  return {

    images: state.images.images
  }
}

export default connect(mapStateToProps, { setImages })(DogsListContainer);