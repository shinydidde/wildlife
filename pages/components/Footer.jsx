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
    <footer className="bg-white text-white p-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-2 logo-slider">
          <div className="flex flex-wrap justify-center space-x-4 mb-2 md:mb-0">
            <Link href="/quiz" className="text-gray-700 hover:text-green-600 transition duration-300">
              Quiz
            </Link>
            <Link href="/documentary" className="text-gray-700 hover:text-green-600 transition duration-300">
              Documentaries
            </Link>
          </div>
          <div className="w-full md:w-1/3 flex justify-center mb-2 md:mb-0">
            <ImageSlider images={logos} />
          </div>

          <div className="flex flex-wrap justify-center space-x-4 mb-2 md:mb-0">
            <Link href="/virtual-tour" className="text-gray-700 hover:text-green-600 transition duration-300">
              Virtual Tours
            </Link>
            <Link href="/forum" className="text-gray-700 hover:text-green-600 transition duration-300">
              Forum
            </Link>
            <Link href="/graph" className="text-gray-700 hover:text-green-600 transition duration-300">
              Graphs
            </Link>
          </div>
        </div>

        <p className="text-gray-700 mt-4 text-center">&copy; 2024 Wildlife Education. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
