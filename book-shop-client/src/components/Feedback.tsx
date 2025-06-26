import Slider from "react-slick";
import { useGetReviewsQuery } from "../redux/features/review/reviewApi";
import { IReview } from "../types/IReview";

const Feedback = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data: reviews } = useGetReviewsQuery(null);

  return (
    <div id="feedback">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Readers Are Saying
        </h2>
        <p className="text-gray-600 mt-2">
          Hear directly from our community of book lovers who trust and enjoy
          shopping at PageTurner.
        </p>
      </div>

      <Slider {...settings}>
        {reviews?.data.map((item: IReview, index: string) => (
          <div key={index} className="px-2 mb-12">
            <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 ">
                {/* <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm"> */}
                {/* <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  /> */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                {/* </div> */}
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  {/* <p className="text-sm text-gray-500">{item.date}</p> */}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.createdAt || "").toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 text-lg mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < item.rating ? "★" : "☆"}</span>
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed text-[15px] italic">
                “{item.review}”
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Feedback;
