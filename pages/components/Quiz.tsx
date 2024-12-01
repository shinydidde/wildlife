// src/components/Quiz.tsx
import React, { useState, useEffect } from 'react';

const Quiz: React.FC = () => {
    const questions = [
        { question: "What is the largest land animal?", options: ["Elephant", "Giraffe", "Rhino", "Hippo"], answer: "Elephant" },
        { question: "Which animal is known as the king of the jungle?", options: ["Lion", "Tiger", "Elephant", "Bear"], answer: "Lion" },
        { question: "What is the primary diet of a Giant Panda?", options: ["Bamboo", "Meat", "Fruit", "Fish"], answer: "Bamboo" },
        { question: "Which bird is known for its ability to mimic human speech?", options: ["Parrot", "Eagle", "Sparrow", "Owl"], answer: "Parrot" },
        { question: "What type of animal is a green whale?", options: ["Fish", "Mammal", "Reptile", "Amphibian"], answer: "Mammal" },
        { question: "Which species is known to be the fastest land animal?", options: ["Cheetah", "Lion", "Gazelle", "Horse"], answer: "Cheetah" },
        { question: "What is the main threat to the survival of many species today?", options: ["Climate Change", "Habitat Loss", "Pollution", "Overfishing"], answer: "Habitat Loss" },
        { question: "Which animal has the longest migration route?", options: ["Arctic Tern", "Humpback Whale", "Salmon", "Caribou"], answer: "Arctic Tern" },
        { question: "What is the primary role of bees in the ecosystem?", options: ["Predators", "Pollinators", "Decomposers", "Herbivores"], answer: "Pollinators" },
        { question: "What percentage of the Earth's surface is covered by oceans?", options: ["50%", "70%", "80%", "90%"], answer: "70%" },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [timer, setTimer] = useState(30); // Timer set to 30 seconds for each question

    useEffect(() => {
        if (timer === 0) {
            handleAnswer("");
        }

        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleAnswer = (option: string) => {
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
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizFinished(false);
        setTimer(30);
        setFeedback(null);
    };

    return (
        <div className="p-6">
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
        </div>
    );
};

export default Quiz;
