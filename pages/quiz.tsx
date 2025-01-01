import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Footer from './components/Footer';

const QuizPage: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);

    const handleStartQuiz = () => {
        setQuizStarted(true);
    };

    const handleResetQuiz = () => {
        setQuizStarted(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-green-100">
            <Header theme="dark" />
            <div className="container mx-auto p-6 mt-24 max-w-4xl">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-400 mb-6">
                        Wildlife Quiz
                    </h1>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Test your knowledge about wildlife and their conservation! Are you ready to dive in?
                    </p>

                    {!quizStarted ? (
                        <button
                            onClick={handleStartQuiz}
                            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Start Quiz
                        </button>
                    ) : (
                        <>
                            <Quiz />
                            <button
                                onClick={handleResetQuiz}
                                className="mt-6 bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Reset Quiz
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Fun Facts Section */}
            <div className="py-16 bg-gradient-to-r from-green-50 via-white to-green-100">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-green-800">Did You Know?</h2>
                        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
                            Learning about wildlife not only improves our knowledge but also helps in conservation efforts.
                            Here are some amazing fun facts about wildlife!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-semibold text-green-700">🐘 Elephants</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">
                                Elephants are the largest land animals on Earth, and they have a highly developed brain that makes them incredibly intelligent.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-semibold text-green-700">🐧 Penguins</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">
                                Penguins may not fly, but they are excellent swimmers and can dive to depths of over 500 meters.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-semibold text-green-700">🦥 Sloths</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">
                                Sloths are so slow-moving that algae often grows on their fur, providing them with natural camouflage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default QuizPage;
