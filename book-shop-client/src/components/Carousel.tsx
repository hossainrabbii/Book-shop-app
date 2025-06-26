import Slider from "react-slick";
const images = [
  "https://wafilife-media.wafilife.com/uploads/2025/05/Desktop-1-4.jpg",
  "https://wafilife-media.wafilife.com/uploads/2025/03/sokher-khata-_notebook_mobile.jpg",
  "https://wafilife-media.wafilife.com/uploads/2025/06/hamba-mobarak-25_2_mobile.jpg",
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="my-4 h-[220px] md:h-auto">
          <img src={image} alt={`Slide ${index}`} className="w-full h-full object-contain"/>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
