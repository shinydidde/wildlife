"use client";

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimalCard from './components/AnimalCard';
// import Banner from './components/Banner';
import BackToTop from './components/BackToTop';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faDove, faFishFins, faDragon, faStaffSnake, faFrog, faWorm, faBug, faShrimp, faSpider, faPlantWilt, faDog, faChild, faBacterium } from '@fortawesome/free-solid-svg-icons';

const categoryIcons: { [key: string]: JSX.Element } = {
    Mammal: <FontAwesomeIcon icon={faPaw} size="3x" />,
    Reptile: <FontAwesomeIcon icon={faStaffSnake} size="3x" />,
    Bird: <FontAwesomeIcon icon={faDove} size="3x" />,
    Mollusk: <FontAwesomeIcon icon={faShrimp} size="3x" />,
    Invertebrate: <FontAwesomeIcon icon={faWorm} size="3x" />,
    Fish: <FontAwesomeIcon icon={faFishFins} size="3x" />,
    Insect: <FontAwesomeIcon icon={faBug} size="3x" />,
    Amphibian: <FontAwesomeIcon icon={faFrog} size="3x" />,
    Dinosaur: <FontAwesomeIcon icon={faDragon} size="3x" />,
    Crustacean: <FontAwesomeIcon icon={faSpider} size="3x" />,
    Dog: <FontAwesomeIcon icon={faDog} size="3x" />,
    Hominid: <FontAwesomeIcon icon={faChild} size="3x" />,
    Plant: <FontAwesomeIcon icon={faPlantWilt} size="3x" />,
    Microorganism: <FontAwesomeIcon icon={faBacterium} size="3x" />,
};


// Define the structure of the animal object
interface Animal {
    _id: string;
    commonName: string;
    category: string;
    scientificName: string;
    country: string;
    taxonomicGroup: string;
    taxonomicSubGroup: string;
    stateConservationRank: string;
    globalConservationRank: string;
    distributionStatus: string;
    imageUrl: string; // Ensure imageUrl is included
}


const Home = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const savedCategory = localStorage.getItem('selectedCategory');
        const savedCountry = localStorage.getItem('selectedCountry');

        if (savedCategory) {
            setSelectedCategory(savedCategory);
        }
        if (savedCountry) {
            setSelectedCountry(savedCountry);
        }

        const fetchAnimals = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://wildlife-be.onrender.com/api/animals');
                if (!res.ok) {
                    throw new Error('Failed to fetch animals');
                }
                const data: Animal[] = await res.json();
                setAnimals(data);
                const categories = [...new Set(data.map(animal => animal.category))];
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching animals:', error);
                // Handle error - you can show an error message to the user
            } finally {
                setLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    const countries = [...new Set(animals.map(animal => animal.country))];

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);
        localStorage.setItem('selectedCountry', country);
    };

    const handleCategorySelect = (category: string) => {
        if (selectedCategory === category) {
            // Remove the selected category if it's already selected
            setSelectedCategory(null);
            localStorage.removeItem('selectedCategory');
        } else {
            setSelectedCategory(category);
            localStorage.setItem('selectedCategory', category);
        }
    };

    const filteredAnimals = animals.filter(animal => {
        const matchesCategory = selectedCategory ? animal.category === selectedCategory : true;
        const matchesCountry = selectedCountry ? animal.country === selectedCountry : true;
        const matchesSearch = animal.commonName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesCountry && matchesSearch;
    });

    return (
        <>
            <Head>
                <title>Animal Atlas</title>
                <meta name="description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Animal Atlas" />
                <meta property="og:description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />
                <meta property="og:image" content="/logo-colorful.png" />
                <meta property="og:url" content="https://wildlife-2pl7.onrender.com" />
                <meta property="og:type" content="website" />

                {/* Twitter Card Tags (optional but recommended) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Animal Atlas" />
                <meta name="twitter:description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />
                <meta name="twitter:image" content="/logo-colorful.png" />
            </Head>
            <div className="lg:min-h-screen flex flex-col">
                <Header />
                {/* Banner Section */}
                <div className="relative bg-cover bg-center h-[90vh]" style={{ backgroundImage: `url('https://images4.alphacoders.com/134/1345397.png')` }}>
                    <div className="absolute inset-0 bg-opacity-40 bg-green-800 flex flex-col justify-center items-center text-white">
                        <h1 className="text-5xl font-extrabold">WILDLIFE</h1>
                        <p className="text-lg text-center mt-4">We love nature. Fight for the rights of wildlife.</p>
                        <button className="mt-6 px-8 py-2 bg-white text-green-800 font-bold rounded-full">SEE MORE</button>
                    </div>
                </div>

                {/* Animal Cards Below the Banner */}
                <div className="container mx-auto mt-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* <div className="relative mb-6">
                                <ImageSlider images={images} />
                            </div> */}

                            {/* Search Bar and Location Selector */}
                            <div className="flex flex-col lg:flex-row mb-6 items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Search for an animal..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-3 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md hover:shadow-lg mb-4 lg:mb-0 lg:mr-4"
                                />

                                {/* Custom Dropdown */}
                                <div className="relative lg:w-1/4 w-full">
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md hover:shadow-lg"
                                        value={selectedCountry || ''}
                                        onChange={(e) => handleCountrySelect(e.target.value)}
                                    >
                                        <option value="">Select Location</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>

                                    {/* Custom Dropdown Arrow */}
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pointer-events-none">
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Category Slider */}
                            <h1 className="text-3xl font-bold mb-4 md:mb-6 text-center">Category {selectedCategory}</h1>
                            <div className="flex overflow-x-auto gap-4 mb-6">
                                {categories.map((category) => (
                                    <div
                                        key={category}
                                        className={`relative min-w-[120px] cursor-pointer transition duration-300 ${selectedCategory === category ? 'opacity-50' : 'hover:opacity-80'}`}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        <div className="flex justify-center items-center border border-gray-300 h-28 w-full rounded-lg">
                                            <div className="text-green-900 mb-2">
                                                {categoryIcons[category]}
                                            </div>
                                        </div>
                                        <h2 className="absolute bottom-0 left-0 right-0 text-lg font-semibold text-white text-center bg-green-900 bg-opacity-40 rounded-b-lg py-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {category}
                                        </h2>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold text-center mb-6">Animals of the Wild</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                {filteredAnimals.map(animal => (
                                    <AnimalCard key={animal._id} animal={animal} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <Footer />
                <BackToTop />
            </div>
        </>
    );
};

export default Home;
