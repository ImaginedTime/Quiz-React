import React, { useEffect, useRef } from 'react'
import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { QuizContext } from '../QuizContext';

import createToast from '../utils/createToast'


// for encoding html entities like &quot; &amp; etc. to their respective characters like " & etc.
import he from 'he';

import { ToastContainer } from 'react-toastify';



export default function QuestionCard({ question, options, selectedOptions, setSelectedOptions, currentQuestion }) {

	const { questions, selectedTime, setCurrentQuestion } = useContext(QuizContext);
	const { score, setScore } = useContext(QuizContext);
	const [selectedOption, setSelectedOption] = useState(null);
	const [time, setTime] = useState(selectedTime);

	const navigate = useNavigate();


	const handleOptionClick = (option) => {
		if (selectedOption === option) {
			setSelectedOption(null);
			let temp = [...selectedOptions];
			temp[currentQuestion] = null;
			setSelectedOptions(temp);
			return;
		}

		setSelectedOption(option);
		let temp = [...selectedOptions];
		temp[currentQuestion] = option;
		setSelectedOptions(temp);
	}

	const HandleSubmitButtonClick = () => {
		console.log(selectedOptions);

		if (selectedOptions[currentQuestion] === undefined || selectedOptions[currentQuestion] === null) {
			createToast('Please Choose An Option!');
			return;
		}
		if (selectedOptions[currentQuestion] === questions.results[currentQuestion].correct_answer) {
			console.log("Correct Answer", questions.results[currentQuestion].correct_answer);
			setScore(score + 1);
		}
		else {
			console.log("Wrong Answer", questions.results[currentQuestion].correct_answer);
		}
		
		if (currentQuestion === questions.results.length - 1) {
			navigate('/score');
			return;
		}

		setCurrentQuestion(currentQuestion + 1);
		setTime(selectedTime);
	}

	const handleTimeUp = () => {
		if (currentQuestion === questions.results.length - 1) {
			window.location.href = '/score';
			return;
		}

		if (selectedOptions[currentQuestion] === questions.results[currentQuestion].correct_answer) {
			console.log("Correct Answer", questions.results[currentQuestion].correct_answer);
		}
		else {
			console.log("Wrong Answer", questions.results[currentQuestion].correct_answer);
		}

		setCurrentQuestion(currentQuestion + 1);
		setTime(selectedTime);
	}


	useEffect(() => {
		const timer = setTimeout(() => {
			if (time === 1) {
				handleTimeUp();
				return;
			}
			setTime(time - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [time]);


	return (
		<div className="question-card">
			<div className="timer-container">
				<p className={`timer-text ${time < selectedTime / 6 ? 'timer-lowest' : time < selectedTime / 3 ? 'timer-low' : 'timer-normal'}`}>
					{time}
				</p>
			</div>

			<div className="question">
				<p className="question-text">
					{currentQuestion + 1}.{' '}
					{he.decode(question)}
				</p>
			</div>

			<div className="options-container">
				{
					options.map((option, index) => {
						return (

							<button
								key={index}
								className={`option ${selectedOption === option && 'selected-option'}`}
								onClick={() => handleOptionClick(option)}
							>
								{he.decode(option)}
							</button>
						)
					})
				}
			</div>

			<div className="submit">
				<button
					className="submit-btn"
					onClick={ HandleSubmitButtonClick }
				>
					Submit
				</button>
			</div>

			<ToastContainer />
		</div>
	)
}