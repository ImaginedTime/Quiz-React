import { useEffect, useRef, useContext } from 'react';

import { QuizContext } from '../QuizContext';



const useFetch = () => {

    const { setQuestions } = useContext(QuizContext);
	const { setCurrentQuestion } = useContext(QuizContext);

	const { selectedCategory } = useContext(QuizContext);
	const { selectedDifficulty } = useContext(QuizContext);
	const { selectedNumberOfQuestions } = useContext(QuizContext);

	const { optionsForEachQuestion, setOptionsForEachQuestion } = useContext(QuizContext);

	const randomlyFillTheOptions = async (data) => {
		let optionsArray = [];
		for(let i = 0; i < data.results.length; i++)
		{
			let op = data.results[i].incorrect_answers.concat(data.results[i].correct_answer);
			op.sort(() => Math.random() - 0.5);
			optionsArray.push(op);
		}
		await setOptionsForEachQuestion(optionsArray);
	}

	const dataFetchedRef = useRef(false);

    const fetchData = async () => {
		try {

			const url = `https://opentdb.com/api.php?amount=${selectedNumberOfQuestions}&category=${selectedCategory.id}&difficulty=${selectedDifficulty}`;
			// const url = `https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple`;

			const response = await fetch(url);
			const data = await response.json();

			await setQuestions(data);
			await randomlyFillTheOptions(data);
			await setCurrentQuestion(0);

			console.log(data);

		} catch (error) {
			console.log(error.type);
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
