import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react';

import { Start, CategoryChoice, DifficultyChoice, QuizParams, Question, Score, NotFound } from './Pages';

import { QuizContext } from './QuizContext';

function App() {

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(10);
	const [selectedDifficulty, setSelectedDifficulty] = useState(null);
	const [selectedTime, setSelectedTime] = useState(30);
	
	const [questions, setQuestions] = useState([]);
	const [optionsForEachQuestion, setOptionsForEachQuestion] = useState([]); // [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]); // [1, 2, 3, 4, 5]
	
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);


	return (
		<QuizContext.Provider value={{ selectedCategory, setSelectedCategory, selectedDifficulty, setSelectedDifficulty, selectedNumberOfQuestions, setSelectedNumberOfQuestions, selectedTime, setSelectedTime, questions, setQuestions, optionsForEachQuestion, setOptionsForEachQuestion, currentQuestion, setCurrentQuestion, selectedOptions, setSelectedOptions, score, setScore, showScore, setShowScore}}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route index element={<Start />} />
						<Route path="category" element={<CategoryChoice />} />
						<Route path="qparams" element={<QuizParams />} />
						<Route path="question" element={<Question />} />
						<Route path="score" element={<Score />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</QuizContext.Provider>
	);
}

export default App;
