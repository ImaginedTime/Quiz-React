import React, { useContext } from 'react'
import { QuizContext } from '../QuizContext'
import '../styles/QuizParams.css'

import { Link } from 'react-router-dom'


import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ToastContainer} from 'react-toastify';
import createToast from '../utils/createToast';



export default function QuizParams() {

	const difficulties = ['easy', 'medium', 'hard'];

	const { selectedDifficulty, setSelectedDifficulty, setSelectedNumberOfQuestions, setSelectedTime } = useContext(QuizContext);

	const questionsText = (questions) => {
		setSelectedNumberOfQuestions(questions);
		return `${questions}`;
	}

	const timeText = (time) => {
		setSelectedTime(time);
		return `${time}`;
	}


	const handleDifficultyClick = (difficulty) => {
		if (selectedDifficulty === difficulty) {
			setSelectedDifficulty(null);
			return;
		}
		setSelectedDifficulty(difficulty);
	}

	return (
		<div>
			<h1>Choose the Quiz Parameters</h1>

			<h2 className='difficulties-header'>Difficulty</h2>
			<div className="difficulties-container">
				{difficulties.map((difficulty, index) => (
					<button
						key={index}
						className={`difficulty-button ${selectedDifficulty == difficulty && 'selected-difficulty'}`}
						onClick={() => handleDifficultyClick(difficulty)}
					>
						{difficulty}
					</button>
				))}
			</div>

			<h2 className='nq-header'>Number of Questions</h2>
			<div className="nq-container">
				<Box sx={{ width: 300 }}>
					<Slider
						aria-label="Number Of Questions"
						defaultValue={10}
						getAriaValueText={questionsText}
						valueLabelDisplay="auto"
						step={1}
						marks
						min={5}
						max={25}
					/>
				</Box>
			</div>

			<h2 className='time-header'>Time Per Question</h2>
			<div className="time-container">
				<Box sx={{ width: 300 }}>
					<Slider
						aria-label="Time Per Question"
						defaultValue={30}
						getAriaValueText={timeText}
						valueLabelDisplay="auto"
						step={5}
						marks
						min={15}
						max={120}
					/>
				</Box>
			</div>

			{
				selectedDifficulty !== null ?
					<Link to='/question'><button className='choose-button'>Start Quiz</button></Link> :
					<button className='choose-button' onClick={() => createToast('Please Choose A Difficulty!')}>Start</button>
			}

			<ToastContainer />

		</div>
	)
}
