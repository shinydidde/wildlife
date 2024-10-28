"use client";

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimalCard from './components/AnimalCard';
import Banner from './components/Banner';
import BackToTop from './components/BackToTop';

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

const categoryImages: { [key: string]: string } = {
    Mammal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Mammal_collage.png/600px-Mammal_collage.png',
    Bird: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYzgmnDlLF5kzajV4e8n23d8oMFumUZewJsKkUrsxcmIRP2o8R6JfkJt3rsO7aInNls8&usqp=CAU',
    Mollusk: 'data:image/jpeg;base64,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',
    Reptile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Reptile003d.jpg/440px-Reptile003d.jpg',
    Invertebrate: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Invertebrate_montage_%282022%29.jpg/520px-Invertebrate_montage_%282022%29.jpg',
    Fish: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExojGZpInbPbiNgqas15X2Dg4mXCgLKGghg&s',
    Insect: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJrAGk6pirDj90twz5ehbbWSEMD5zFiaOhg&s',
    Amphibian: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlu0Z4hB80CNFXFNIQFe5vBxw3Gfd-zle7aQ&s',
    Dinosaur: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxzkSjlaL4eW7jhJUrcnojufXJ9VFLmhXdQ&s',
    Crustacean: 'https://cdnintech.com/media/chapter/85637/1689756875/media/F4.png',
    Dog: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHY1JMsKAV-smXeqYKAOqAUqYZ2l7xHygPg&s',
    Hominid: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Hominidae_%28extant_species%29.jpg/220px-Hominidae_%28extant_species%29.jpg',
    Plant: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ6PBIzMx_KnxjKDlqDDv1T9m0BF_35LYN-w&s',
    Microorganism: 'https://cdn.prod.website-files.com/607645f176105d6803fb88d5/66522e85e83286add69bb6f2_vecteezy_micro-organism-magnifie.jpg',
};

const Home = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for filtering

    useEffect(() => {
        const fetchAnimals = async () => {
            setLoading(true); // Set loading to true when starting to fetch
            const res = await fetch('http://localhost:5002/api/animals'); // Ensure the API is running
            const data: Animal[] = await res.json(); // Explicitly type the data
            setAnimals(data);

            // Extract unique categories
            const categories = [...new Set(data.map(animal => animal.category))];
            setCategories(categories);
            setLoading(false); // Set loading to false after data is fetched
        };
        fetchAnimals();
    }, []);

    const countries = [...new Set(animals.map(animal => animal.country))];

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);
    };

    const filteredAnimals = animals.filter(animal => {
        const matchesCategory = selectedCategory ? animal.category === selectedCategory : true;
        const matchesCountry = selectedCountry ? animal.country === selectedCountry : true;
        const matchesSearch = animal.commonName.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesCountry && matchesSearch;
    });

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <Banner />
            <div className="container mx-auto mt-8">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Banner Image */}
                        <div className="relative mb-6">
                            <img src="https://wallpapercave.com/wp/wp4154076.jpg" alt="Wildlife Banner" className="w-full h-60 object-cover rounded-lg" />
                        </div>

                        {/* Search Bar and Location Selector */}
                        <div className="flex flex-col lg:flex-row mb-6 items-center justify-between">
                            <input
                                type="text"
                                placeholder="Search for an animal..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md hover:shadow-lg mb-4 lg:mb-0 lg:mr-4"
                            />
                            <select
                                className="border border-gray-300 rounded-lg p-3 w-full lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md hover:shadow-lg lg:ml-4"
                                value={selectedCountry || ''}
                                onChange={(e) => handleCountrySelect(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        {/* Category Slider */}
                        <h1 className="text-3xl font-bold mb-4 md:mb-6 text-center">Category {selectedCategory}</h1>
                        <div className="flex overflow-x-auto gap-4 mb-6">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    className={`relative min-w-[120px] cursor-pointer transition duration-300 ${selectedCategory === category ? 'opacity-50' : 'hover:opacity-80'
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <img
                                        src={categoryImages[category]}
                                        alt={category}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <h2 className="absolute bottom-2 left-0 right-0 text-lg font-semibold text-white text-center bg-gray-900 bg-opacity-50 rounded-b-lg">
                                        {category}
                                    </h2>
                                </div>
                            ))}
                        </div>

                        {/* Animals Section */}
                        {/* <h2 className="text-2xl font-bold mb-4 md:mb-6 text-center">Animals</h2> */}
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
    );
};

export default Home;
