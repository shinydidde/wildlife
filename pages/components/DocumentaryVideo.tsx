// src/components/DocumentaryVideo.tsx
import React from 'react';

const DocumentaryVideo: React.FC = () => {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Wildlife Conservation Documentary</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default DocumentaryVideo;
