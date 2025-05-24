import Navbar from "../components/Navbar";
import AddBookForm from "../components/AddBookForm";
import AllBooks from "../components/AllBooks";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import AddBookCategory from "../components/AddBookCategory";
import Carousel from "../components/Carousel";

const MainLayout = () => {
  const images = [
    "https://via.placeholder.com/600x400/ff7f7f/333333?text=Slide+1",
    "https://via.placeholder.com/600x400/7f7fff/333333?text=Slide+2",
    "https://via.placeholder.com/600x400/7fff7f/333333?text=Slide+3",
  ];

  return (
    <div className="container mx-auto px-4">
      {/* <Navbar /> */}
      {/* <Carousel images={images} /> */}
 
    </div>
  );
};

export default MainLayout;
