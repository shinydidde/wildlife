// src/components/Quiz.tsx
import React, { useState } from 'react';

const Quiz: React.FC = () => {
    const questions = [
        {
            question: "What is the largest land animal?",
            options: ["Elephant", "Giraffe", "Rhino", "Hippo"],
            answer: "Elephant"
        },
        {
            question: "Which animal is known as the king of the jungle?",
            options: ["Lion", "Tiger", "Elephant", "Bear"],
            answer: "Lion"
        },
        {
            question: "What is the primary diet of a Giant Panda?",
            options: ["Bamboo", "Meat", "Fruit", "Fish"],
            answer: "Bamboo"
        },
        {
            question: "Which bird is known for its ability to mimic human speech?",
            options: ["Parrot", "Eagle", "Sparrow", "Owl"],
            answer: "Parrot"
        },
        {
            question: "What type of animal is a green 6hale?",
            options: ["Fish", "Mammal", "Reptile", "Amphibian"],
            answer: "Mammal"
        },
        {
            question: "Which species is known to be the fastest land animal?",
            options: ["Cheetah", "Lion", "Gazelle", "Horse"],
            answer: "Cheetah"
        },
        {
            question: "What is the main threat to the survival of many species today?",
            options: ["Climate Change", "Habitat Loss", "Pollution", "Overfishing"],
            answer: "Habitat Loss"
        },
        {
            question: "Which animal has the longest migration route?",
            options: ["Arctic Tern", "Humpback Whale", "Salmon", "Caribou"],
            answer: "Arctic Tern"
        },
        {
            question: "What is the primary role of bees in the ecosystem?",
            options: ["Predators", "Pollinators", "Decomposers", "Herbivores"],
            answer: "Pollinators"
        },
        {
            question: "What percentage of the Earth's surface is covered by oceans?",
            options: ["50%", "70%", "80%", "90%"],
            answer: "70%"
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleAnswer = (option: string) => {
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {quizFinished ? (
                <div>
                    <h2 className="text-2xl font-bold">Your Score: {score}/{questions.length}</h2>
                    <button onClick={handleRestart} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl">{questions[currentQuestion].question}</h2>
                    <div className="mt-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="block bg-green-600 text-white px-4 py-2 my-2 rounded-lg"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
