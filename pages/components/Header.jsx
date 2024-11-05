// src/components/Header.jsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 bg-transparent shadow-md z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center">
          <img
            className="w-10 h-10 mr-2"
            src="/logo-color.png"
            alt="Wildlife Logo"
          />
          <h1 className="text-2xl font-bold text-green-600">Atlas</h1>
        </Link>
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
