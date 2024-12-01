import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';

const ContactUsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission logic here (e.g., sending an email or saving the data)
        if (name && email && message) {
            setFormStatus('Thank you for reaching out. We will get back to you soon.');
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setFormStatus('Please fill in all the fields.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header theme="dark" />

                <Banner/>
            <div className="container mx-auto mt-12 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-600">Contact Us</h2>
                    <p className="text-xl mt-4 text-gray-700">
                        We would love to hear from you! Please fill out the form below and we will get in touch with you as soon as possible.
                    </p>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="message" className="block text-lg font-semibold text-gray-700">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    {formStatus && (
                        <div className="mt-4 text-center">
                            <p className="text-lg font-semibold text-gray-700">{formStatus}</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUsPage;
