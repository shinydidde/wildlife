"use client";

import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { motion } from "framer-motion";

const exercises = [
    {
        id: 1,
        title: "Breathing with the Rhythm of Nature",
        description: "Focus on your breath while visualizing a peaceful forest or meadow.",
        media: "https://i.gifer.com/1PXn.gif",
        points: 10,
    },
    {
        id: 2,
        title: "Wildlife Visualization",
        description: "Imagine walking in a serene wildlife sanctuary. Watch the video to guide your imagination.",
        media: "https://www.youtube.com/embed/5D-fWkQylSQ",
        points: 15,
    },
    {
        id: 3,
        title: "Soundscape Meditation",
        description: "Close your eyes and listen to the sounds of nature.",
        media: "/nature.mp3",
        points: 20,
    },
    {
        id: 4,
        title: "Animal Companion Reflection",
        description: "Think about your favorite animal and imagine spending a calm moment with it in the wild.",
        media: "https://media1.popsugar-assets.com/files/thumbor/HNTGuST7AK8Lt6UbQq5YA3usrG8=/fit-in/500x214/top/filters:format_auto():upscale()/2014/01/14/951/n/1922243/2a11e9a00e0c1465_tumblr_mhc5ukFAdr1qf4k86o1_500.gif",
        points: 25,
    },
    {
        id: 5,
        title: "Mindful Walk Challenge",
        description: "Take a 10-minute walk outdoors. Focus on the sounds, sights, and textures around you.",
        media: "https://www.youtube.com/embed/ShG6kISrHoU",
        points: 30,
    },
    {
        id: 6,
        title: "Guided Wildlife Meditation",
        description: "Listen to this guided meditation that immerses you in a wildlife setting.",
        media: "/meditation.mp3",
        points: 40,
    },
];

const mindfulnessTips = [
    "Take slow, deep breaths to ground yourself.",
    "Focus on the sights, sounds, and smells around you.",
    "Spend at least 10 minutes a day outdoors in nature.",
    "Practice gratitude by reflecting on things you're thankful for.",
    "Engage your senses by touching a leaf, feeling the wind, or smelling a flower.",
    "Observe wildlife in your surroundings with curiosity and patience.",
    "Try journaling about your nature experiences and how they make you feel.",
    "Disconnect from digital devices and immerse yourself in the present moment.",
];

const MindfulnessPage: React.FC = () => {
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);

    const toggleCompletion = (id: number, points: number) => {
        if (completedExercises.includes(id)) {
            setCompletedExercises(completedExercises.filter((ex) => ex !== id));
            setScore(score - points);
        } else {
            setCompletedExercises([...completedExercises, id]);
            setScore(score + points);
        }
    };

    return (
        <>
            <Header theme="dark" />
            <div className="min-h-screen p-6 mt-20">
                {/* Header Section */}
                <header className="text-center mb-12">
                    <motion.h1
                        className="text-5xl font-bold text-green-700"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Mindfulness with Nature
                    </motion.h1>
                    <p className="text-xl text-green-600 mt-4 max-w-2xl mx-auto">
                        Experience the calming effects of mindfulness inspired by the beauty of wildlife and the serenity of natural environments.
                    </p>
                </header>

                {/* Gamification Score */}
                <section className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-green-700">Your Mindfulness Score: {score}</h2>
                    <p className="text-gray-600 mt-2">Complete more exercises to earn points and unlock badges!</p>
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Benefits of Mindfulness</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Reduced Stress", description: "Mindfulness practices help lower cortisol levels, promoting relaxation and reducing anxiety." },
                            { title: "Enhanced Focus", description: "Improve your attention span and clarity by training your mind to stay in the present moment." },
                            { title: "Connection with Nature", description: "Build a deeper appreciation for the natural world and its role in your mental well-being." },
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg p-6 text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-800">{benefit.title}</h3>
                                <p className="text-gray-600 mt-4">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Mindfulness Techniques Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Mindfulness Techniques</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exercises.map((exercise) => (
                            <motion.div
                                key={exercise.id}
                                className={`bg-white rounded-lg shadow-lg p-6 ${completedExercises.includes(exercise.id) ? "opacity-50" : ""}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-800 mb-2">{exercise.title}</h3>
                                <p className="text-gray-600 mb-4">{exercise.description}</p>
                                {exercise.media.includes("youtube.com") ? (
                                    <div className="relative w-full aspect-video">
                                        <iframe
                                            src={exercise.media}
                                            title={exercise.title}
                                            className="w-full h-full rounded-lg"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : exercise.media.includes("mp3") ? (
                                    <audio controls className="w-full mt-4">
                                        <source src={exercise.media} type="audio/mp3" />
                                    </audio>
                                ) : (
                                    <img src={exercise.media} alt={exercise.title} className="w-full mt-4 rounded-lg" />
                                )}
                                <button
                                    className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                                    onClick={() => toggleCompletion(exercise.id, exercise.points)}
                                >
                                    {completedExercises.includes(exercise.id) ? "Mark as Incomplete" : "Mark as Complete"}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tips for Practicing Mindfulness */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Tips for Practicing Mindfulness</h2>
                    <div className="space-y-4">
                        {mindfulnessTips.map((tip, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-green-50"
                                whileHover={{ scale: 1.02 }}
                            >
                                {tip}
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default MindfulnessPage;
