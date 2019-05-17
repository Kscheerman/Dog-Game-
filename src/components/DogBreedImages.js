import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class DogBreedImages extends React.Component {
    render() {

        return (
            <div className="dog-breed-images">
                <h1>Dogs Breed Images</h1>

                <p className ="dogBreeds">This page shows 10 images of the <b>{this.props.breed}</b> breed. Study them well!</p>

                    <p><Link to="/">Go back to the index</Link></p>
                <div >
                    {this.props.images && this.props.images.map(url => <img src={url} alt="Dog" />)}
                    {!this.props.images && 'Loading...'}
                </div>
            </div>
        )
    }
}

export default connect()(DogBreedImages);