import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import Header from './components/Header';
import Footer from './components/Footer';

// Define the Pet type
interface Pet {
    name: string;
    image: string;
    category: string;
    description: string;
    careTips: string[];
    funFact: string;
}

const PetToWildlifePage = () => {
    const router = useRouter(); // Initialize router
    const [pets, setPets] = useState<Pet[]>([]); // Use Pet[] instead of any[]
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Fetch data from the petsData.json file
        const fetchPetsData = async () => {
            const res = await fetch('./petsData.json'); // Adjust the path as needed
            const data: Pet[] = await res.json();
            setPets(data);
        };

        fetchPetsData();
    }, []);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredPets = pets.filter(pet => pet.category.includes(selectedCategory || ''));

    return (
        <div className="min-h-screen flex flex-col">
            <Header theme="dark" />
            <div className="container mx-auto mt-32 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-600">Understanding Animal Care: From Pets to Wildlife</h2>
                    <p className="text-xl mt-4 text-gray-700">
                        Learn how caring for domestic pets can help you understand wildlife conservation and how both are interconnected.
                    </p>
                </div>

                {/* Introduction Section */}
                <div className="text-center my-8">
                    <h3 className="text-2xl font-semibold text-green-600">Domestic Life Education & Wildlife Conservation</h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Caring for pets responsibly helps in understanding the impact we have on the environment and wildlife. Learn how adopting good practices with domestic animals can lead to wildlife awareness.
                    </p>
                </div>

                {/* Pet Care Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h4 className="text-xl font-semibold text-green-600">Pet Care Basics</h4>
                    <p className="text-gray-600 mt-4">
                        Starting with understanding how to care for domestic animals will give you a better perspective on how wildlife needs protection. Here are some key points for responsible pet ownership:
                    </p>
                    <ul className="list-disc pl-6 mt-4 text-gray-600">
                        <li>Provide a proper diet and ensure hydration.</li>
                        <li>Respect natural behaviors and needs, like space and companionship.</li>
                        <li>Prevent overpopulation through sterilization and adoption.</li>
                        <li>Promote sustainable pet products to reduce your environmental footprint.</li>
                    </ul>
                </div>

                {/* Connecting Pets to Wildlife */}
                <div className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
                    <h4 className="text-xl font-semibold text-green-600">From Pets to Wildlife Conservation</h4>
                    <p className="mt-4 text-lg text-gray-600">
                        The principles we apply in taking care of pets can also be applied to wildlife. Here’s how you can start making a positive impact:
                    </p>
                    <ul className="list-disc pl-6 mt-4 text-gray-600">
                        <li>Understand the interconnection between domesticated and wild species.</li>
                        <li>Engage in local wildlife conservation efforts like supporting shelters and protecting habitats.</li>
                        <li>Educate others about the impact of exotic pet trade on wildlife populations.</li>
                        <li>Contribute to wildlife sanctuaries and eco-friendly animal conservation programs.</li>
                    </ul>
                </div>

                {/* Search Bar and Category Selector */}
                <div className="mb-6 flex flex-col lg:flex-row items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search for a pet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md"
                    />
                    <select
                        className="border border-gray-300 rounded-lg p-3 w-full lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 shadow-md mt-4 lg:mt-0"
                        value={selectedCategory || ''}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                    >
                        <option value="">Select Pet Category</option>
                        <option value="Mammal">Mammals</option>
                        <option value="Bird">Birds</option>
                        <option value="Reptile">Reptiles</option>
                        <option value="Amphibian">Amphibians</option>
                    </select>
                </div>

                {/* Pet Cards Section with Hover Effects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {filteredPets.map((pet) => (
                        <div
                            key={pet.name}
                            className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src={pet.image}
                                alt={pet.name}
                                width={200}
                                height={200}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                            <p className="text-gray-600 mb-4">{pet.description}</p>
                            <button
                                onClick={() => router.push(`/pets/${pet.name.toLowerCase()}`)} // Correct usage of router.push
                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>

                {/* Call-to-Action Section */}
                <div className="bg-yellow-100 rounded-lg shadow-md p-6 mt-8 text-center">
                    <h3 className="text-xl font-bold text-green-700">Get Involved</h3>
                    <p className="text-lg text-gray-600 mt-4">
                        Join us in supporting wildlife conservation efforts. Adopt pets responsibly, protect habitats, and educate others about wildlife preservation.
                    </p>
                    <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200">
                        Learn How You Can Help
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PetToWildlifePage;
