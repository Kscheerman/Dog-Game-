import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import { NavLink } from "react-router-dom";
import '../CSS/HomePage.css'


export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <img src={logo} alt="Game Logo"></img>
                <h1>WHOOF WHOOF</h1>
                <div className="buttons">
                    <button><Link to="/game1">Play Game One</Link></button>
                    <button><Link to="/game2">Play Game Two</Link></button>
                    <button><Link to="/game3">Play Game Three</Link></button>
                    <button><Link to="/practice">Learn more about the breeds</Link></button>
                </div>
            </div>
        )

    }
}
