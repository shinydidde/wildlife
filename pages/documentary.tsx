import React, { useState } from 'react';
import DocumentaryVideo from './components/DocumentaryVideo';
import Header from './components/Header';
import Footer from './components/Footer';

const documentaries = [
    {
        id: 'bS1P5OGgNwQ',
        title: 'The Last Wild',
        description: 'An exploration of the challenges and efforts in wildlife conservation across the globe. A compelling look at endangered species.',
        category: 'Endangered Species'
    },
    {
        id: 'oMjwX6wtHJw',
        title: 'The Hidden World of Elephants',
        description: 'Delve deep into the lives of elephants and understand their struggle against poaching and habitat loss.',
        category: 'Poaching & Habitat Loss'
    },
    {
        id: '5gQkU6_HIE0',
        title: 'Saving the Planet',
        description: 'A documentary that explores the effects of climate change on wildlife and the efforts to mitigate it.',
        category: 'Climate Change'
    }
];

const DocumentaryPage: React.FC = () => {
    const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});

    const handleLike = (id: string) => {
        setLikes((prevLikes) => ({ ...prevLikes, [id]: !prevLikes[id] }));
    };

    const handleCommentChange = (id: string, comment: string) => {
        setComments((prevComments) => ({ ...prevComments, [id]: comment }));
    };

    return (
        <>
            <Header theme='dark' />
            <div className="container mx-auto my-8 p-6">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-6">Wildlife Conservation Documentaries</h1>
                <p className="text-lg text-center text-gray-600 mb-8">
                    Discover powerful documentaries about wildlife conservation and learn about the efforts to save endangered species.
                </p>

                {/* Documentary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documentaries.map((doc) => (
                        <DocumentaryVideo
                            key={doc.id}
                            videoId={doc.id}
                            title={doc.title}
                            description={doc.description}
                            category={doc.category}
                            liked={likes[doc.id] || false}
                            onLike={() => handleLike(doc.id)}
                            comment={comments[doc.id] || ''}
                            onCommentChange={(e) => handleCommentChange(doc.id, e.target.value)}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
    </>
    );
};

export default DocumentaryPage;
