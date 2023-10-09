import React from 'react'
import '../styles/Start.css'
import { Link } from 'react-router-dom'

export default function Start() {
    return (
        <div className='start-container'>
            <h1 className='start-heading'>Welcome to the Quiz App</h1>
            <p className='start-description'>Click the button below to start the quiz</p>
            <Link to="/category">
                <button className='start-button'>Start Quiz</button>
            </Link>
        </div>
    )
}
