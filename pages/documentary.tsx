"use client";

import { useEffect, useState } from 'react';
import DocumentaryVideo from './components/DocumentaryVideo';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';

interface Documentary {
    id: string;
    title: string;
    description: string;
    category: string;
}

const DocumentaryPage: React.FC = () => {
    const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
    const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});
    const [images, setImages] = useState<string[]>([]); // Added state to hold images

    useEffect(() => {
        const fetchDocumentaries = async () => {
            const response = await fetch('/data/documentaries.json'); // Adjust the path if necessary
            const data: { documentaries: Documentary[], images: string[] } = await response.json();
            setDocumentaries(data.documentaries);
            setImages(data.images);
        };

        fetchDocumentaries();
    }, []);

    const handleLike = (id: string) => {
        setLikes((prevLikes) => ({ ...prevLikes, [id]: !prevLikes[id] }));
    };

    const handleCommentChange = (id: string, comment: string) => {
        setComments((prevComments) => ({ ...prevComments, [id]: comment }));
    };

    return (
        <>
            <Header theme="dark" />
            <ImageSlider images={images} />
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
            <Footer />
        </>
    );
};

export default DocumentaryPage;
