// src/pages/about.tsx
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import { useEffect, useState } from 'react';

// Define the structure of the data fetched from the JSON file
interface AboutData {
    images: string[];
    aboutText: string[];
}

const About: React.FC = () => {
    const [data, setData] = useState<AboutData | null>(null); // State to hold the fetched data

    useEffect(() => {
        // Fetch data from the JSON file
        const fetchData = async () => {
            const response = await fetch('/data/aboutData.json');
            const data: AboutData = await response.json();
            setData(data);
        };

        fetchData();
    }, []);

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
    </div>;
    }

    return (
        <div className="bg-primary lg:min-h-screen flex flex-col">
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn more about our wildlife education platform." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ImageSlider images={data.images} />
            <div className="container mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
                {data.aboutText.map((paragraph: string, index: number) => (
                    <p className="text-lg mb-4" key={index}>{paragraph}</p>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default About;
