// src/pages/about.tsx
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';

const About: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn more about our wildlife education platform." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ImageSlider />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-lg">
                    Welcome to Wildlife Education! Our mission is to educate and inspire the next generation
                    about the importance of wildlife conservation. Join us in our journey to learn about
                    various species and their habitats.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default About;
