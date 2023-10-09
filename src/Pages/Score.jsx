import React from 'react'

import { useContext } from 'react';
import { QuizContext } from '../QuizContext';

import '../styles/Score.css'

export default function Score() {

	const { score } = useContext(QuizContext);
	const { questions } = useContext(QuizContext);
	const { selectedOptions } = useContext(QuizContext);

	console.log("Score Page");
	console.log(score);
	console.log(questions);
	console.log(selectedOptions);

	return (
		<div>
			<div className="score-container">
				<h1 className='score'>Score: {score}</h1>

				<div className="score-card">
					{
						questions.results.map((question, index) => {
							return (
								<div className="score-card-item" key={index}>
									<p className="score-question">
										{index + 1}. {question.question}
									</p>
									<p className={`score-answer ${ selectedOptions[index] == question.correct_answer ? 'correct-answer-chosen': 'wrong-answer-chosen'}`}>
										Your Answer: {selectedOptions[index]}
									</p>
									<p className="score-correct-answer">
										Correct Answer: {question.correct_answer}
									</p>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
