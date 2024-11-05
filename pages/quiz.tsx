// src/pages/quiz.tsx
import React from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';

const QuizPage: React.FC = () => {
    return (
        <>
            <Header />
        <div className="container mx-auto my-8">
            <h1 className="text-4xl font-bold text-center">Wildlife Quiz</h1>
            <Quiz />
        </div>
        </>
    );
};

export default QuizPage;
