import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const token = useAppSelector(useCurrentToken);

  return (
    <div className="flex justify-between items-center p-4 rounded-full sticky top-1 z-40 bg-opacity-60 backdrop-blur-sm border-[#2103] border container mx-auto">
      <Link to="/">
        <h1>GyanZon</h1>
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
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
