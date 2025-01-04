import React from 'react';
import WildlifeVirtualTour from './components/WildlifeVirtualTour';
import Header from './components/Header';
import Link from 'next/link';
import Footer from './components/Footer';

const VirtualTourPage: React.FC = () => {
    return (
        <>
            <Header theme="dark" />
            <div className="container mx-auto px-4 my-8 mt-32">
                {/* Hero Section */}
                <section
                    className="relative bg-cover bg-center h-[30vh] sm:h-[40vh] text-center text-white flex items-center justify-center"
                    style={{
                        backgroundImage:
                            'url(https://i.pinimg.com/originals/4e/1f/30/4e1f306cf9ce2f0255a5538be608a519.gif)',
                    }}
                >
                    <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
                    <div className="z-10 px-4">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Explore the Wild from Home</h1>
                        <p className="text-md sm:text-lg lg:text-xl mt-4">
                            Take a journey through some of the most beautiful wildlife habitats on Earth
                        </p>
                        <Link
                            href="/documentary"
                            className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 mt-4 sm:mt-6 inline-block rounded-lg text-md sm:text-lg font-medium hover:bg-green-700 transition"
                        >
                            Start Your Journey
                        </Link>
                    </div>
                </section>

                {/* Wildlife Tours Section */}
                <section className="my-8 sm:my-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
                        Wildlife Virtual Tours
                    </h2>
                    <WildlifeVirtualTour />
                    <div className="mt-6 sm:mt-8 text-center">
                        <Link
                            href="/more-tours"
                            className="text-md sm:text-lg text-green-600 font-bold hover:underline transition"
                        >
                            Explore More Tours
                        </Link>
                    </div>
                </section>

                {/* Interactive Facts Section */}
                <section className="my-8 sm:my-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Did You Know?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-lg sm:text-2xl font-semibold">Serengeti Safari</h3>
                            <p className="mt-2 text-sm sm:text-lg text-gray-700">
                                The Serengeti is famous for its annual migration of wildebeest, zebras, and other animals
                                across the plains. Join us on a journey through this iconic ecosystem!
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-lg sm:text-2xl font-semibold">Amazon Rainforest</h3>
                            <p className="mt-2 text-sm sm:text-lg text-gray-700">
                                The Amazon Rainforest is home to countless species. Take a tour to explore its diverse
                                wildlife and learn how we can protect this vital ecosystem.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <h3 className="text-lg sm:text-2xl font-semibold">Great Barrier Reef</h3>
                            <p className="mt-2 text-sm sm:text-lg text-gray-700">
                                Dive into the vibrant underwater world of the Great Barrier Reef, home to thousands of
                                marine species. Discover its beauty and the threats it faces.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive Wildlife Map Section */}
                <section className="my-8 sm:my-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Explore Wildlife Habitats</h2>
                    <div className="relative bg-gray-200 h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg iframe-container">
                        <iframe
                            src="https://www.google.com/maps/d/embed?mid=1XLNjlSAT4xc2TyuA94WJ0Oac3-NXG7Q&ehbc=2E312F&output=embed"
                            title="Wildlife Habitats Map"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                    <p className="text-center mt-4 text-sm sm:text-lg text-gray-700">
                        Explore key wildlife sanctuaries, national parks, and biodiversity hotspots. Click on a location
                        to learn about the species that call it home.
                    </p>
                </section>

                {/* Call to Action Section */}
                <section className="bg-green-600 text-white text-center py-8 sm:py-12 rounded-lg shadow-md">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-4">Be a Part of Conservation</h2>
                    <p className="text-md sm:text-lg mb-4 sm:mb-6">
                        Your participation in these virtual tours helps raise awareness about wildlife conservation
                        efforts around the world. Explore, learn, and take action!
                    </p>
                    <Link
                        href="/forum"
                        className="bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-md sm:text-xl font-bold hover:bg-gray-100 transition"
                    >
                        Support Wildlife Conservation
                    </Link>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default VirtualTourPage;
