import { useEffect, useRef } from 'react';

import { useContext } from 'react';

import { QuizContext } from '../QuizContext';



const useFetch = () => {

    const { setQuestions } = useContext(QuizContext);
	const { setCurrentQuestion } = useContext(QuizContext);

	const { selectedCategory } = useContext(QuizContext);
	const { selectedDifficulty } = useContext(QuizContext);
	const { selectedNumberOfQuestions } = useContext(QuizContext);

	const dataFetchedRef = useRef(false);

    const fetchData = async () => {
		try {

			const url = `https://opentdb.com/api.php?amount=${selectedNumberOfQuestions}&category=${selectedCategory.id}&difficulty=${selectedDifficulty}`;
			// const url = `https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple`;

			const response = await fetch(url);
			const data = await response.json();
			await setQuestions(data);
			setCurrentQuestion(0);

			console.log(data);

		} catch (error) {
			window.location.href = '/';
		}
	};

	useEffect(() => {
		if (dataFetchedRef.current)
			return;
		dataFetchedRef.current = true;
		fetchData();
	}, []);
}

export default useFetch;