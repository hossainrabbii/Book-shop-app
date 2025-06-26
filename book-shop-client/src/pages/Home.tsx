import AllBooks from "../components/AllBooks";
import Carousel from "../components/Carousel";
import Feedback from "../components/Feedback";
import HomeIntro from "../components/HomeIntro";

const Home = () => {
  return (
    <>
      <title>PageTurner</title>
      <div className="container mx-auto px-4 mb-20">
        <div id="banner">
          <Carousel />
        </div>
        <HomeIntro />
        <AllBooks />
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Choose the Perfect Package for You
          </h2>
          <p className="text-gray-600 mt-2">
            Flexible plans for every type of reader — from casual explorers to
            dedicated bookworms.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-12">
          <img
            src="https://wafilife-media.wafilife.com/uploads/2023/12/book-suggestion-min-1.jpg"
            alt=""
            className="rounded"
          />
          <img
            src="https://wafilife-media.wafilife.com/uploads/2023/12/discount-books-min.jpg"
            alt=""
            className="rounded"
          />
          <img
            src="https://wafilife-media.wafilife.com/uploads/2023/12/over-discount-publication-min.jpg"
            alt=""
            className="rounded"
          />
          <img
            src="https://wafilife-media.wafilife.com/uploads/2023/12/babuder-boiyer-vubon.jpg"
            alt=""
            className="rounded"
          />
        </div>
        <Feedback />
      </div>
    </>
  );
};

export default Home;
