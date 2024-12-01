import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-700 p-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Links */}
        <div className="flex flex-wrap justify-center space-x-8 mb-4 md:mb-0">
          <Link href="/quiz" className="text-lg font-semibold text-white hover:text-green-200 transition duration-300">
            Quiz
          </Link>
          <Link href="/documentary" className="text-lg font-semibold text-white hover:text-green-200 transition duration-300">
            Documentaries
          </Link>
        </div>

        {/* Middle section: Logo or branding */}
        {/* Optionally add a logo slider here */}
        {/* <div className="flex justify-center mb-4 md:mb-0">
          <ImageSlider images={logos} />
        </div> */}

        {/* Right side: More links */}
        <div className="flex flex-wrap justify-center space-x-8 mb-4 md:mb-0">
          <Link href="/virtual-tour" className="text-lg font-semibold text-white hover:text-green-200 transition duration-300">
            Virtual Tours
          </Link>
          <Link href="/forum" className="text-lg font-semibold text-white hover:text-green-200 transition duration-300">
            Forum
          </Link>
          <Link href="/graph" className="text-lg font-semibold text-white hover:text-green-200 transition duration-300">
            Graphs
          </Link>
        </div>
      </div>

      <p className="text-center text-lg text-white mt-6">&copy; 2024 Wildlife Education. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
