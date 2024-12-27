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

    if (!animal) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        ); // Show loading or error message
    }

    return (
        <Link href="/animal/[id]" as={`/animal/${animal._id}`} onClick={handleCardClick}>
            <div className="shadow-md hover:shadow-lg transition-all transform hover:scale-105 rounded-lg overflow-hidden bg-white border border-gray-200 flex flex-col h-full w-64">
                {/* Image */}
                <div className="h-40 bg-gray-100">
                    <img
                        src={imageUrl}
                        alt={animal.commonName}
                        className="h-full w-full object-center"
                    />
                </div>
                {/* Content */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <div className="flex justify-between mb-3 space-x-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">{animal.taxonomicGroup}</span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">{animal.taxonomicSubGroup}</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-center text-green-700 truncate">{animal.commonName}</h2>
                        <h3 className="text-sm text-center text-gray-500 mt-1 italic truncate">({animal.scientificName})</h3>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 text-center">
                        <p>Distribution: <span className="font-medium">{animal.distributionStatus}</span></p>
                        <p>Found in: <span className="font-medium">{animal.country}</span></p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimalCard;
