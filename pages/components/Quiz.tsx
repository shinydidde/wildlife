import React, { useState, useEffect, useCallback } from 'react';

// Define types for the quiz data
interface Question {
    question: string;
    options: string[];
    answer: string;
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]); // Use explicit type for questions
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(30); // Timer set to 30 seconds for each question

    // Handle answer logic moved before useEffect
    const handleAnswer = useCallback((option: string) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
            setFeedback("Correct!");
        } else {
            setFeedback(`Incorrect! The correct answer was ${questions[currentQuestion].answer}`);
        }

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setFeedback(null);
                setCurrentQuestion(currentQuestion + 1);
                setTimer(30); // Reset timer for the next question
            }, 1500);
        } else {
            setTimeout(() => setQuizFinished(true), 1500);
        }
    }, [currentQuestion, score, questions]);

    // Load quiz data from JSON file
    useEffect(() => {
        const loadQuizData = async () => {
            const response = await fetch('/data/quizData.json');
            const data: Question[] = await response.json(); // Type the fetched data as an array of Question objects
            setQuestions(data);
        };
        loadQuizData();
    }, []);

    useEffect(() => {
        if (timer === 0) {
            handleAnswer(""); // Move this to a function with logic for unanswered questions
        }

        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, handleAnswer]); // Add handleAnswer to the dependency array

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setTimer(30);
        setFeedback(null);
    };

    return (
        <div className="p-6">
            {questions.length > 0 && (
                <>
                    <div className="mb-6 text-center">
                        <h3 className="text-2xl font-semibold text-green-600">{questions[currentQuestion].question}</h3>
                        <p className="mt-4 text-sm text-gray-500">Time Left: {timer}s</p>
                    </div>

                    {feedback && <div className="text-center text-lg font-semibold text-green-700">{feedback}</div>}

                    <div className="mt-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="block w-full bg-green-600 text-white px-4 py-3 my-2 rounded-lg text-lg hover:bg-green-700 transition duration-200"
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {quizFinished && (
                        <div className="text-center mt-6">
                            <h2 className="text-2xl font-bold text-green-700">Your Score: {score}/{questions.length}</h2>
                            <p className="text-lg text-gray-600 mt-4">
                                {score === questions.length ? "Perfect! You got all answers correct!" : `Good job! Keep learning!`}
                            </p>
                            <button
                                onClick={handleRestart}
                                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
                            >
                                Restart Quiz
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Quiz;
