import React, { useContext } from 'react'
import useFetch from '../hooks/useFetch';

import { QuizContext } from '../QuizContext';
import '../styles/Question.css'


import Loader from '../components/Loader';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


import QuestionCard from '../components/QuestionCard';


export default function Question() {

	const { questions } = useContext(QuizContext);
	const { currentQuestion } = useContext(QuizContext);
	const { optionsForEachQuestion } = useContext(QuizContext);

	const { selectedOptions, setSelectedOptions } = useContext(QuizContext); // [option1, option2, option3, option4]

	// fetches the data from the api
	useFetch();

	return (
		<div>
			<div className="question-container">
				{
					(questions.results != null &&
						currentQuestion != null &&
						questions.results.length > 0 &&
						currentQuestion < questions.results.length &&
						questions.results[currentQuestion] != null &&
						optionsForEachQuestion != null
					) ?

						<QuestionCard
							question={questions.results[currentQuestion].question}
							options={optionsForEachQuestion[currentQuestion]}
							selectedOptions={selectedOptions}
							setSelectedOptions={setSelectedOptions}
							currentQuestion={currentQuestion}
						/>
						:
						<Loader />
				}
				<ToastContainer />
			</div>

		</div>
	)
}