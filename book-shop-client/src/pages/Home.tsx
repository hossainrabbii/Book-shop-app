import AddBookCategory from "../components/AddBookCategory";
import AddBookForm from "../components/AddBookForm";
import AllBooks from "../components/AllBooks";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
  <div className="container mx-auto px-4">
      <Carousel />
      <AllBooks />
      <AddBookForm />
      <AddBookCategory />
    </div>
  );
};

export default Home;
