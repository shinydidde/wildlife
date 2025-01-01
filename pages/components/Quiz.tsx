import React, { useState, useEffect, useCallback } from 'react';

// Define types for the quiz data
interface Question {
    question: string;
    options: string[];
    answer: string;
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(30); // Timer set to 30 seconds for each question

    const handleAnswer = useCallback(
        (option: string) => {
            if (option === questions[currentQuestion].answer) {
                setScore(score + 1);
                setFeedback("🎉 Correct!");
            } else {
                setFeedback(`❌ Incorrect! The correct answer was "${questions[currentQuestion].answer}"`);
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
        },
        [currentQuestion, score, questions]
    );

    // Load quiz data from JSON file
    useEffect(() => {
        const shuffleArray = (array: Question[]): Question[] => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const loadQuizData = async () => {
            const response = await fetch('/data/quizData.json');
            const data: Question[] = await response.json();
            setQuestions(shuffleArray(data));
        };

        loadQuizData();
    }, []);

    useEffect(() => {
        if (timer === 0) {
            handleAnswer(""); // Handle unanswered questions
        }

        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, handleAnswer]);

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setTimer(30);
        setFeedback(null);
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="rounded-lg shadow-lg p-8 max-w-2xl w-full">
                {questions.length > 0 && !quizFinished && (
                    <>
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-green-700 text-center">
                                {questions[currentQuestion].question}
                            </h3>
                            <div className="relative mt-4 h-2 w-full bg-gray-200 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${(timer / 30) * 100}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-2 text-center">Time Left: {timer}s</p>
                        </div>

                        {feedback && (
                            <div
                                className={`text-center text-lg font-semibold p-4 rounded-lg mb-6 ${
                                    feedback.includes("Correct") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                            >
                                {feedback}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {quizFinished && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-700">Your Score: {score}/{questions.length}</h2>
                        <p className="text-lg text-gray-700 mt-4">
                            {score === questions.length
                                ? "Perfect! You aced the quiz!"
                                : `Great effort! Keep learning and try again.`}
                        </p>
                        <button
                            onClick={handleRestart}
                            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-300"
                        >
                            Restart Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
