import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

// Censored words array (example, can be expanded)
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
    const [filter, setFilter] = useState<string>(''); // Search filter for posts

    useEffect(() => {
        // Fetch forum posts from Firestore
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
                    dislikeCount: doc.data().dislikeCount || 0
                });
            });
            setPosts(postsArray);
        });

        return () => unsubscribe(); // Clean up the listener
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out censored words
        let filteredPost = newPost;
        censoredWords.forEach((word) => {
            filteredPost = filteredPost.replace(new RegExp(`\\b${word}\\b`, 'gi'), '***'); // Replacing the bad words
        });

        // Add new post to Firebase if no offensive words
        if (filteredPost.trim() !== '' && username.trim() !== '') {
            await addDoc(collection(db, 'posts'), {
                username: username,
                message: filteredPost,
                timestamp: new Date().toISOString(),
                likeCount: 0,
                dislikeCount: 0
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

    const filteredPosts = posts.filter((post) => {
        return post.message.toLowerCase().includes(filter.toLowerCase()) || post.username.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div className="forum-container flex justify-center mt-8 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row w-full max-w-screen-lg space-y-8 sm:space-y-0 sm:space-x-8">

                {/* Form Section */}
                <div className="w-full sm:w-1/3 bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Post Your Thoughts</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border p-3 rounded w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                placeholder="Type your post here..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                className="border p-3 rounded w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={5}
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded w-full transition duration-300 hover:bg-blue-500">
                            Post
                        </button>
                    </form>
                </div>

                {/* Posts Section */}
                <div className="w-full sm:w-2/3 bg-white shadow-lg rounded-lg p-8 overflow-y-auto max-h-[500px] sm:h-auto">
                    {/* Search Filter */}
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-3 rounded w-full mb-6 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="space-y-6">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                                    <div className="flex justify-between items-center font-bold text-lg text-gray-800">
                                        <span>{post.username}</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleLike(post.id, post.likeCount)}
                                                className="bg-green-600 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-green-500"
                                            >
                                                <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                                                <span className="ml-1">{post.likeCount}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDislike(post.id, post.dislikeCount)}
                                                className="bg-red-600 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-red-500"
                                            >
                                                <FontAwesomeIcon icon={faThumbsDown} size="lg" />
                                                <span className="ml-1">{post.dislikeCount}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-gray-600 my-4">{post.message}</div>
                                    <div className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</div>
                                </div>
                            ))
                        ) : (
                            <div>No posts yet.</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Forum;
