import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import logo from "../assets/logoo.png";
const Navbar = () => {
  const token = useAppSelector(useCurrentToken);
  return (
    <div className="flex justify-between items-center px-4 py-2 sticky top-0 z-40 bg-opacity-60 backdrop-blur-sm border-[#2103] border mx-auto bg-[#282828] text-white">
      <Link to="/">
        <img src={logo} alt="logo" className="h-[50px]" />
        <p className="text-sm">PageTurner</p>
      </Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>
        <Link to="/books">All Books</Link>

        <Link to="/contact">Contact</Link>
      </div>
      <div>
        {/* <button>Login</button> */}

        {token ? (
          <Link
            to="/dashboard/profile"
            className="bg-green-500 text-white rounded-full p-2"
          >
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className="bg-blue-500 rounded p-2">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
