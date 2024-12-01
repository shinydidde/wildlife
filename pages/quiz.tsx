// src/pages/quiz.tsx
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Footer from './components/Footer';

const QuizPage: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    return (
        <>
            <Header theme='dark' />
            <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg max-w-3xl">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-green-700 mb-4">Wildlife Quiz</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Test your knowledge about wildlife and their conservation! Ready to start?
                    </p>

                    {!quizStarted ? (
                        <button
                            onClick={handleStartQuiz}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
                        >
                            Start Quiz
                        </button>
                    ) : (
                        <Quiz />
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default QuizPage;
