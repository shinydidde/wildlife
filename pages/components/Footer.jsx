import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-700 p-6 mt-12">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        {/* Left Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 justify-center items-center mb-4 md:mb-0">
          <Link
            href="/quiz"
            className="text-lg font-semibold text-white hover:text-green-200 transition duration-300 mb-2 md:mb-0"
          >
            Quiz
          </Link>
          <Link
            href="/documentary"
            className="text-lg font-semibold text-white hover:text-green-200 transition duration-300 mb-2 md:mb-0"
          >
            Documentaries
          </Link>
        </div>

        {/* Center Branding */}
        <div className="text-center text-white text-lg font-semibold mb-4 md:mb-0">
          &copy; 2024 Wildlife Education. All rights reserved.
        </div>

        {/* Right Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 justify-center items-center">
          <Link
            href="/virtual-tour"
            className="text-lg font-semibold text-white hover:text-green-200 transition duration-300 mb-2 md:mb-0"
          >
            Virtual Tours
          </Link>
          <Link
            href="/forum"
            className="text-lg font-semibold text-white hover:text-green-200 transition duration-300 mb-2 md:mb-0"
          >
            Forum
          </Link>
          <Link
            href="/graph"
            className="text-lg font-semibold text-white hover:text-green-200 transition duration-300"
          >
            Graphs
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
