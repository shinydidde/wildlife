import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './components/Header';
import Footer from './components/Footer';
import StatsCard from './components/StatsCard';

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
    const router = useRouter();
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const stats = [
        { title: 'Pets Cared For', value: '1,200+', description: 'Responsible pet owners educated.' },
        { title: 'Species Covered', value: '300+', description: 'Wildlife species listed in our database.' },
        { title: 'Conservation Projects', value: '50+', description: 'Active wildlife projects supported.' }
    ];

    useEffect(() => {
        // Fetch data from the petsData.json file
        const fetchPetsData = async () => {
            const res = await fetch('/data/petsData.json');
            const data: Pet[] = await res.json();
            setPets(data);
        };

        fetchPetsData();
    }, []);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredPets = pets.filter(pet =>
        pet.category.includes(selectedCategory || '') &&
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-primary">
            <Header theme="light" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-500 to-green-700 text-white py-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">From Pets to Wildlife Conservation</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        Discover how caring for pets can teach us valuable lessons about protecting and conserving wildlife.
                    </p>
                </div>

            </div>

            {/* Stats Section */}
            <section className="container mx-auto py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Why This Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value} // Use `value` instead of `stat`
                        description={stat.description}
                    />
                ))}
                </div>
            </section>

            {/* Pet Categories and Search */}
            <div className="container mx-auto py-8 px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Search for a pet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        className="border border-gray-300 rounded-lg p-4 w-full lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={selectedCategory || ''}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Mammal">Mammals</option>
                        <option value="Bird">Birds</option>
                        <option value="Reptile">Reptiles</option>
                        <option value="Amphibian">Amphibians</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {filteredPets.map((pet) => (
                        <div
                            key={pet.name}
                            className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all cursor-pointer"
                            onClick={() => router.push(`/pets/${pet.name.toLowerCase()}`)}
                        >
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="w-full h-48 object-cover rounded-t-md"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 mt-4">{pet.name}</h3>
                            <p className="text-gray-600 text-sm mt-2">{pet.description}</p>
                            <button
                                onClick={() => router.push(`/pets/${pet.name.toLowerCase()}`)}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-700"
                            >
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call-to-Action Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 text-center">
                <h3 className="text-3xl font-bold">Ready to Make a Difference?</h3>
                <p className="mt-4 text-lg">
                    Join our community and start your journey from pet care to wildlife conservation.
                </p>
                <button className="mt-6 bg-white text-green-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100"
                onClick={() => router.push(`/forum`)}
                >
                    Get Started
                </button>
            </section>

            <Footer />
        </div>
    );
};

export default PetToWildlifePage;
