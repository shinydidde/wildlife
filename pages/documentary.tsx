// src/pages/documentary.tsx
import React from 'react';
import DocumentaryVideo from './components/DocumentaryVideo';
import Header from './components/Header';

const DocumentaryPage: React.FC = () => {
    return (
        <>
            <Header />
        <div className="container mx-auto my-8">
            <h1 className="text-4xl font-bold text-center">Wildlife Conservation Documentaries</h1>
            <DocumentaryVideo />
        </div>
        </>
    );
};

export default DocumentaryPage;
