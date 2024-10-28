// src/components/ImageSlider.tsx
import React from 'react';
import Slider from 'react-slick';

const images = [
  'https://img.freepik.com/premium-photo/world-wildlife-day-creative-banner-with-planet-animals-ai-generated_154515-20870.jpg',
  'https://img.freepik.com/premium-photo/world-wildlife-day-creative-banner-with-planet-animals-ai-generated_154515-20870.jpg',
  'https://img.freepik.com/premium-photo/world-wildlife-day-creative-banner-with-planet-animals-ai-generated_154515-20870.jpg',
];

const ImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-full">
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
