import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const censoredWords = ['badword1', 'badword2', 'offensiveword'];

interface ForumPost {
    id: string;
    username: string;
    message: string;
    timestamp: string;
    likeCount: number;
    dislikeCount: number;
}

const Forum: React.FC = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [newPost, setNewPost] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray: ForumPost[] = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({
                    id: doc.id,
                    username: doc.data().username,
                    message: doc.data().message,
                    timestamp: doc.data().timestamp,
                    likeCount: doc.data().likeCount || 0,
                    dislikeCount: doc.data().dislikeCount || 0,
                });
            });
            setPosts(postsArray);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let filteredPost = newPost;
        censoredWords.forEach((word) => {
            filteredPost = filteredPost.replace(new RegExp(`\\b${word}\\b`, 'gi'), '***');
        });

        if (filteredPost.trim() !== '' && username.trim() !== '') {
            await addDoc(collection(db, 'posts'), {
                username: username,
                message: filteredPost,
                timestamp: new Date().toISOString(),
                likeCount: 0,
                dislikeCount: 0,
            });
            setNewPost('');
        }
    };

    const handleLike = async (postId: string, currentLikes: number) => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, { likeCount: currentLikes + 1 });
    };

    const handleDislike = async (postId: string, currentDislikes: number) => {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, { dislikeCount: currentDislikes + 1 });
    };

    const filteredPosts = posts.filter((post) =>
        post.message.toLowerCase().includes(filter.toLowerCase()) ||
        post.username.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="forum-container flex justify-center py-8 px-4 sm:px-8">
            <div className="flex flex-col md:flex-row w-full max-w-screen-xl gap-8">

                {/* Form Section */}
                <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Share Your Thoughts</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Type your post here..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows={5}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                        >
                            Post
                        </button>
                    </form>
                </div>

                {/* Posts Section */}
                <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-gray-700">{post.username}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleLike(post.id, post.likeCount)}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400 transition"
                                            >
                                                <FontAwesomeIcon icon={faThumbsUp} /> <span>{post.likeCount}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDislike(post.id, post.dislikeCount)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                                            >
                                                <FontAwesomeIcon icon={faThumbsDown} /> <span>{post.dislikeCount}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-2">{post.message}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(post.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No posts found.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Forum;
