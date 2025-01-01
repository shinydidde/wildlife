"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    const router = useRouter();
    const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
    const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchDocumentaries = async () => {
            const response = await fetch('/data/documentaries.json');
            const data: { documentaries: Documentary[]; images: string[] } = await response.json();
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
            <Header />
            <ImageSlider images={images} />

            <div className="container mx-auto my-8 px-6">
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

                {/* User Testimonials Section */}
                <section className="my-12">
                    <h2 className="text-3xl font-bold text-center text-green-700 mb-6">What Our Viewers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700">&quot;This platform opened my eyes to the beauty of wildlife and the importance of conservation.&quot;</p>
                            <span className="block text-green-600 font-semibold mt-4">- Jane Doe</span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700">&quot;I loved the documentaries on endangered species. Truly inspiring!&quot;</p>
                            <span className="block text-green-600 font-semibold mt-4">- John Smith</span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700">&quot;This is a great way to learn about wildlife while being entertained.&quot;</p>
                            <span className="block text-green-600 font-semibold mt-4">- Sarah Lee</span>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-green-600 text-white py-8 px-6 rounded-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Us in Conserving Wildlife</h2>
                    <p className="text-lg mb-6">Your actions today can help protect the planet for future generations.</p>
                    <button onClick={() => router.push(`/forum`)} className="bg-white text-green-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition">
                        Learn More
                    </button>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default DocumentaryPage;
