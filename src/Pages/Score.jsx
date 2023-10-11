import React from 'react'

import { useContext } from 'react';
import { QuizContext } from '../QuizContext';

import '../styles/Score.css';

import he from 'he';

function ScoreCardItem({ question, options, selectedOption, correctOption }) {
	return (
		<div className="score-card-item">
			<p className="score-question">
				{he.decode(question)}
			</p>
			<div className="score-card-item-options">
				{
					options.map((option, i) => {
						return (
							<p
								key={i}
								className={`score-card-item-options-option
											${selectedOption == option && selectedOption != correctOption ? 'wrong-option' : ''} 
											${option == correctOption ? 'correct-option' : ''}`}
							>
								{he.decode(option)}
							</p>
						)
					})
				}
			</div>
		</div>
	)
}


export default function Score() {

	const { score } = useContext(QuizContext);
	const { questions } = useContext(QuizContext);
	const { selectedOptions } = useContext(QuizContext);
	const { optionsForEachQuestion } = useContext(QuizContext);

	return (
		<div>
			<div className="score-container">
				<h1 className='score'>Score: {score}</h1>

				<div className="score-card">
					{
						questions.results != null ?
							questions.results.map((question, index) => {
								return (
									<ScoreCardItem key={index}
										question={question.question}
										options={optionsForEachQuestion[index]}
										selectedOption={selectedOptions[index]}
										correctOption={question.correct_answer}
									/>
								)
							})
							:
							window.location.href = '/'
					}
				</div>
			</div>
		</div>
	)
}
