import Link from 'next/link';

interface Animal {
    _id: string;
    commonName: string;
    scientificName: string;
    taxonomicGroup: string;
    taxonomicSubGroup: string;
    imageUrl?: string; // Optional
}

const AnimalCard: React.FC<{ animal: Animal }> = ({ animal }) => {
    // Provide fallback values in case the animal prop is undefined
    const fallbackImage = "https://placehold.co/600x400"; // Placeholder image URL
    const imageUrl = animal?.imageUrl || fallbackImage; // Use optional chaining

    const handleCardClick = () => {
        localStorage.setItem('animalDetails', JSON.stringify(animal)); // Save to local storage
    };

    // Handle case where animal is undefined
    if (!animal) {
        return <div className="bg-gray-200 p-4 rounded-lg">Loading...</div>; // Show loading or error message
    }

    return (
        <Link href="/animal/[id]" as={`/animal/${animal._id}`} onClick={handleCardClick}>
            <div className="bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-lg m-2 w-64 flex flex-col h-full">
                {/* Image */}
                <img
                    src={imageUrl}
                    alt={animal.commonName}
                    className="rounded-t-lg h-40 w-full object-cover"
                />
                {/* Content */}
                <div className="flex-grow flex flex-col p-4 justify-between rounded-b-lg">
                    <h2 className="text-xl font-semibold mt-2 text-center">{animal.commonName}</h2>
                    <h2 className="text-xl font-bold text-green-800 mb-1 text-center">
                        <span className="text-sm text-gray-500">({animal.scientificName})</span>
                    </h2>
                    <div className="flex space-x-1 mb-2 text-center">
                        <span className="bg-green-200 flex-1 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{animal.taxonomicGroup}</span>
                        <span className="bg-purple-200 flex-1 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{animal.taxonomicSubGroup}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimalCard;
