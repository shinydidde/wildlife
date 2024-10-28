import Link from 'next/link';

const AnimalCard = ({ animal }) => {
    const fallbackImage = "https://placehold.co/600x400"; // Placeholder image URL
    const imageUrl = animal.imageUrl || fallbackImage;

    const handleCardClick = () => {
        localStorage.setItem('animalDetails', JSON.stringify(animal)); // Save to local storage
    };

    return (
        <Link href="/animal/[id]" as={`/animal/${animal._id}`} onClick={handleCardClick}>
            <div className="bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-lg p-4 m-2 w-64">
                <img src={imageUrl} alt={animal.commonName} className="rounded-t-lg h-40 w-full object-cover" />
                <h2 className="text-xl font-semibold mt-2 text-center">{animal.commonName}</h2>
                <h2 className="text-xl font-bold text-green-800 mb-1 text-center">
                    <span className="text-sm text-gray-500">({animal.scientificName})</span>
                </h2>
                <div className="flex space-x-1 mb-2 text-center">
                    <span className="bg-green-200 flex-1 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{animal.taxonomicGroup}</span>
                    <span className="bg-purple-200 flex-1 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{animal.taxonomicSubGroup}</span>
                </div>
            </div>
        </Link>
    );
};

export default AnimalCard;
