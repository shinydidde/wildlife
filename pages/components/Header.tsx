import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeaderProps {
  theme?: 'dark' | 'light'; // 'dark' for black text, 'light' for default white text
}

const Header: React.FC<HeaderProps> = ({ theme = 'light' }) => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Change navbar color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = theme === 'dark' ? (scrolling ? 'text-white' : 'text-green-900') : (scrolling ? 'text-white' : 'text-white');

  return (
    <header
      className={`fixed w-full top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50 ${scrolling ? 'bg-green-900 shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1
            className={`text-3xl font-extrabold ${textColor} tracking-tight hover:text-green-200 transition duration-300`}
          >
            Atlas
          </h1>
        </Link>

        {/* Desktop Navbar */}
        <nav className="space-x-8 hidden md:flex">
          <Link
            href="/"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            About
          </Link>
          <Link
            href="/sanctuaries"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            Sanctuaries
          </Link>
          <Link
            href="/pets"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            Pets
          </Link>
          <Link
            href="/mindfulness"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            Mindfulness
          </Link>
          <Link
            href="/contact-us"
            className={`text-lg font-medium ${textColor} hover:text-green-200 transition duration-300`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Navbar Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl text-white hover:text-green-200 transition duration-300"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i> {/* Toggle between hamburger and close icons */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute left-0 w-full bg-green-900 top-full p-4 shadow-lg`}
      >
        <nav className="space-y-4"> {/* space-y-4 creates vertical spacing between the links */}
          <Link
            href="/"
            className={`text-lg font-medium ${textColor} hover:text-green-600 transition duration-300 block`} // Added block to ensure the link takes up full width
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-lg font-medium ${textColor} hover:text-green-600 transition duration-300 block`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/sanctuaries"
            className={`text-lg font-medium ${textColor} hover:text-green-600 transition duration-300 block`}
            onClick={() => setIsMenuOpen(false)}
          >
            Sanctuaries
          </Link>
          <Link
            href="/pets"
            className={`text-lg font-medium ${textColor} hover:text-green-600 transition duration-300 block`}
            onClick={() => setIsMenuOpen(false)}
          >
            Pets
          </Link>
          <Link
            href="/contact-us"
            className={`text-lg font-medium ${textColor} hover:text-green-600 transition duration-300 block`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>

    </header>
  );
};

export default Header;
