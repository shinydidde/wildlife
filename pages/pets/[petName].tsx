import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define types for Pet and RelatedPet
interface RelatedPet {
    name: string;
    image: string;
    description: string;
}

interface Pet {
    name: string;
    image: string;
    category: string;
    description: string;
    careTips: string[];
    funFact: string;
    relatedPets: RelatedPet[];
}

const PetDetailsPage = () => {
    const router = useRouter();
    const { petName } = router.query;

    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const petNameStr = Array.isArray(petName) ? petName[0] : petName;
        if (petNameStr) {
            fetch('/data/petsData.json')
                .then(response => response.json())
                .then((data: Pet[]) => {
                    const foundPet = data.find((p) => p.name.toLowerCase() === petNameStr?.toLowerCase());
                    setPet(foundPet || null);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [petName]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
            </div>
        );
    }

    if (!pet) {
        return <p className="text-center mt-16 text-red-600">Pet not found</p>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header theme="dark" />
            <div className="container mx-auto mt-20 px-4">
                {/* Pet Details */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    {/* Pet Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img src={pet.image} alt={pet.name} className="w-96 h-auto object-cover rounded-2xl shadow-lg" />
                    </div>

                    {/* Pet Info */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-5xl font-extrabold text-green-700 mb-4">{pet.name}</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">{pet.description}</p>

                        {/* Care Tips */}
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-green-600">Care Tips</h3>
                            <ul className="mt-4 list-disc pl-6 text-gray-800 space-y-3">
                                {pet.careTips.map((tip, index) => (
                                    <li key={index} className="hover:underline">{tip}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Fun Facts */}
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-green-600">Fun Fact</h3>
                            <p className="mt-4 text-lg text-gray-800 italic">{pet.funFact}</p>
                        </div>
                    </div>
                </div>

                {/* Related Pets */}
                <div className="mt-16">
                    <h3 className="text-4xl font-bold text-green-700 text-center">Related Pets</h3>
                    <p className="text-center text-gray-600 mt-2">Discover other amazing pets!</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {pet.relatedPets?.length ? (
                            pet.relatedPets.map((relatedPet, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6 cursor-pointer"
                                    onClick={() => router.push(`/pets/${relatedPet.name.toLowerCase()}`)}
                                >
                                    <img src={relatedPet.image} alt={relatedPet.name} className="w-full h-48 object-cover rounded-lg" />
                                    <h5 className="text-xl font-semibold mt-6 text-green-700 text-center">{relatedPet.name}</h5>
                                    <p className="text-gray-600 mt-4 text-center leading-relaxed">{relatedPet.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No related pets found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PetDetailsPage;
