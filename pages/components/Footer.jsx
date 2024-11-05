// src/components/Footer.tsx
import Link from 'next/link';
import ImageSlider from './ImageSlider';

const logos = [
  '/logo.png',
  '/logo-color.png',
  '/logo-colorful.png',
  '/logo-green.png',
  '/logo-light-color.png',
  '/logo-red.png',
  '/logo-pink.png',
];

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-2 logo-slider"> {/* Use full width for spacing */}
          <div className="flex space-x-4"> {/* Left Links */}
            <Link href="/quiz" className="text-gray-200 hover:text-green-400 transition duration-300">
              Quiz
            </Link>
            <Link href="/documentary" className="text-gray-200 hover:text-green-400 transition duration-300">
              Documentaries
            </Link>
          </div>

          <ImageSlider images={logos} />

          <div className="flex space-x-4"> {/* Right Links */}
            <Link href="/virtual-tour" className="text-gray-200 hover:text-green-400 transition duration-300">
              Virtual Tours
            </Link>
            <Link href="/forum" className="text-gray-200 hover:text-green-400 transition duration-300">
              Forum
            </Link>
            <Link href="/graph" className="text-gray-200 hover:text-green-400 transition duration-300">
              Graphs
            </Link>
          </div>
        </div>

        <p className="text-gray-200 mt-4">&copy; 2024 Wildlife Education. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
