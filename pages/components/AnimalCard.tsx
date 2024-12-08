import Link from 'next/link';

interface Animal {
    _id: string;
    commonName: string;
    scientificName: string;
    taxonomicGroup: string;
    taxonomicSubGroup: string;
    distributionStatus: string;
    country: string;
    imageUrl?: string; // Optional
}

const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
    const fallbackImage = "https://placehold.co/600x400"; // Placeholder image URL
    const imageUrl = animal?.imageUrl || fallbackImage; // Use optional chaining

    const handleCardClick = () => {
        localStorage.setItem('animalDetails', JSON.stringify(animal)); // Save to local storage
    };

    // Handle case where animal is undefined
    if (!animal) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        ); // Show loading or error message
    }

    return (
        <Link href="/animal/[id]" as={`/animal/${animal._id}`} onClick={handleCardClick}>
            <div className="shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-lg m-2 w-64 flex flex-col h-full">
                {/* Image */}
                <img
                    src={imageUrl}
                    alt={animal.commonName}
                    className="rounded-t-lg h-48 w-full object-cover object-center"
                />
                {/* Content */}
                <div className="flex-grow flex flex-col p-4 justify-between rounded-b-lg">
                    <h2 className="text-2xl font-bold text-center text-green-800">{animal.commonName}</h2>
                    <h3 className="text-lg font-medium text-center text-gray-600">
                        <span className="italic text-gray-400">({animal.scientificName})</span>
                    </h3>

                    <div className="flex flex-wrap justify-center mt-2">
                        <span className="bg-green-300 text-green-800 text-xs font-medium mr-2 px-3 py-0.5 rounded-full mb-1">{animal.taxonomicGroup}</span>
                        <span className="bg-purple-300 text-purple-800 text-xs font-medium mr-2 px-3 py-0.5 rounded-full mb-1">{animal.taxonomicSubGroup}</span>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <div className="text-sm text-gray-600 mb-2">Distribution: {animal.distributionStatus}</div>
                        <div className="text-sm text-gray-600">Found in: {animal.country}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimalCard;
