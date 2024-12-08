import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import { useEffect, useState } from 'react';

// Define the structure of the data fetched from the JSON file
interface AboutData {
    images: string[];
    aboutText: string[];
    missionText: string[];
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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        );
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

            {/* Our History Section */}
            <section className="container mx-auto mt-8 px-4 py-8 bg-green-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
                {data.aboutText.map((paragraph: string, index: number) => (
                    <p className="text-lg mb-4" key={index}>{paragraph}</p>
                ))}
            </section>

            {/* Mission Section */}
            <section className="container mx-auto mt-8 px-4 py-8 bg-yellow-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
                {data.missionText.map((paragraph: string, index: number) => (
                    <p className="text-lg mb-4" key={index}>{paragraph}</p>
                ))}
            </section>

            {/* Why Wildlife Education Section */}
            <section className="container mx-auto mt-8 px-4 py-8 bg-blue-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Why Wildlife Education?</h2>
                <p className="text-lg mb-4">
                    In a world where human impact on the environment is becoming more pronounced, wildlife education plays a crucial role in shaping conservation efforts. It not only helps individuals understand the importance of biodiversity but also empowers them to act as stewards of the planet.
                </p>
                <p className="text-lg mb-4">
                    Our platform integrates interactive tools, videos, and real-life case studies to foster a deep connection with the natural world. By learning about endangered species and ecosystems, users are encouraged to make informed decisions that positively impact conservation.
                </p>
            </section>

            {/* Call to Action Section */}
            <section className="container mx-auto mt-8 px-4 py-8 bg-red-50 rounded-lg shadow-md text-center">
                <h2 className="text-3xl font-bold mb-4">Join Us in Wildlife Conservation</h2>
                <p className="text-lg mb-6">Get involved in preserving our planet’s biodiversity. Learn, engage, and act today!</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                    Learn More
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default About;
