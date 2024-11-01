// src/components/ImageSlider.tsx
import React from 'react';
import Slider from 'react-slick';

// Define props type
interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    pauseOnHover: false
  };

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              className="w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
