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

    const [pet, setPet] = useState<Pet | null>(null); // Use Pet type, initialized as null
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const petNameStr = Array.isArray(petName) ? petName[0] : petName;
        if (petNameStr) {
            // Fetch pet data from the JSON file
            fetch('/petsData.json')
                .then(response => response.json())
                .then((data: Pet[]) => {
                    const foundPet = data.find((p) => p.name.toLowerCase() === petNameStr?.toLowerCase());
                    setPet(foundPet || null); // Set pet or null if not found
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [petName]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!pet) {
        return <p className="text-center mt-8">Pet not found</p>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header theme="dark" />
            <div className="container mx-auto mt-32 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-600">{pet.name}</h2>
                    <p className="text-xl mt-4 text-gray-700">{pet.description}</p>
                </div>

                {/* Care Tips Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h4 className="text-xl font-semibold text-green-600">Care Tips</h4>
                    <ul className="list-disc pl-6 mt-4 text-gray-600">
                        {pet.careTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>

                {/* Fun Facts Section */}
                <div className="bg-green-100 rounded-lg shadow-md p-6 mb-6">
                    <h4 className="text-xl font-semibold text-green-600">Fun Facts</h4>
                    <p className="mt-4 text-lg text-gray-600">{pet.funFact}</p>
                </div>

                {/* Pet Image */}
                <div className="text-center mt-8">
                    <img src={pet.image} alt={pet.name} className="w-full max-w-xs h-auto object-cover rounded-md" />
                </div>

                {/* Related Pets Section */}
                <div className="mt-12 text-center">
                    <h4 className="text-2xl font-semibold text-green-600">Related Pets</h4>
                    <p className="mt-4 text-lg text-gray-600">Discover other amazing pets that you might love to learn about!</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {pet.relatedPets.map((relatedPet, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <img src={relatedPet.image} alt={relatedPet.name} className="w-full h-40 object-cover rounded-md" />
                                <h5 className="text-lg font-semibold mt-2">{relatedPet.name}</h5>
                                <p className="text-gray-600 mt-2">{relatedPet.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PetDetailsPage;
