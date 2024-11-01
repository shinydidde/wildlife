// src/components/Header.jsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-md z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 mr-2" // Add margin to the right for spacing
            src="https://png.pngtree.com/png-vector/20231215/ourmid/pngtree-care-about-wildlife-png-image_11364694.png"
            alt="Wildlife Logo"
          />
          <h1 className="text-2xl font-bold text-green-600">Wildlife Education</h1>
        </div>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600 transition duration-300">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
