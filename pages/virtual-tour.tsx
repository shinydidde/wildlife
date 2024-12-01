import React from 'react';
import WildlifeVirtualTour from './components/WildlifeVirtualTour';
import Header from './components/Header';
import Link from 'next/link';
import Footer from './components/Footer';

const VirtualTourPage: React.FC = () => {
    return (
        <>
            <Header theme='dark'/>
            <div className="container mx-auto my-8 mt-32">
                <section className="relative bg-cover bg-center h-96 text-center text-white flex items-center justify-center"
                    style={{ backgroundImage: 'url(https://i.pinimg.com/originals/4e/1f/30/4e1f306cf9ce2f0255a5538be608a519.gif)' }}>
                    <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
                    <h1 className="text-5xl font-bold z-10">Explore the Wild from Home</h1>
                    <p className="text-xl mt-4 z-10">Take a journey through some of the most beautiful wildlife habitats on Earth</p>
                </section>

                <section className="my-8">
                    <h2 className="text-4xl font-bold text-center mb-6">Wildlife Virtual Tours</h2>
                    <WildlifeVirtualTour />
                    <div className="mt-8 text-center">
                        <Link href="/more-tours" className="text-lg text-green-600 font-bold hover:underline transition">Explore More Tours</Link>
                    </div>
                </section>

                {/* Interactive Information Section */}
                <section className="my-8">
                    <h2 className="text-3xl font-semibold text-center mb-6">Did You Know?</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold">Serengeti Safari</h3>
                            <p className="mt-2 text-lg text-gray-700">The Serengeti is famous for its annual migration of wildebeest, zebras, and other animals across the plains. Join us on a journey through this iconic ecosystem!</p>
                        </div>
                        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold">Amazon Rainforest</h3>
                            <p className="mt-2 text-lg text-gray-700">The Amazon Rainforest is home to countless species. Take a tour to explore its diverse wildlife and learn how we can protect this vital ecosystem.</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="text-center my-8">
                    <h2 className="text-3xl font-semibold mb-4">Be a Part of Conservation</h2>
                    <p className="text-lg text-gray-700 mb-4">Your participation in these virtual tours helps raise awareness about wildlife conservation efforts around the world. Explore, learn, and take action!</p>
                    <Link href="/donate" className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-700 transition">Support Wildlife Conservation</Link>
                </section>
            </div>
            <Footer/>
        </>
    );
};

export default VirtualTourPage;
