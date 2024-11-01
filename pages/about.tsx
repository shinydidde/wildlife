// src/pages/about.tsx
import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';

const images = [
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/herd-of-zebra-in-lake-manyara-in-tanzanian-national-park-web-header.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/ring-tailed-lemur-header.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/cache/pair-of-cute-chimpanzees-header.jpg-nggid042290-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/cache/pretty-deer-in-rain-forest-header.jpg-nggid042291-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/cache/wonderful-walking-turtles-website-header.jpg-nggid042742-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/cache/white-young-wild-bear-website-header.jpg-nggid042744-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg',
    'https://www.freewebheaders.com/wp-content/gallery/wildlife/cache/cute-young-tigers-website-header.jpg-nggid042743-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg'
  ];

const About: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>About Us</title>
                <meta name="description" content="Learn more about our wildlife education platform." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ImageSlider images={images}/>
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
