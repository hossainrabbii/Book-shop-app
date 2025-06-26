import { Route, Routes } from "react-router-dom"; // No Router here
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProtectedRoute from "./layout/ProtectedRoute";
import Order from "./pages/Order";
import DashboardLayout from "./layout/DashboardLayout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./components/Profile";
import OrderItem from "./components/OrderItem";
import Products from "./components/Products";
import Categlries from "./components/Categlries";
import Users from "./components/Users";
import AddBookForm from "./components/AddBookForm";
import ProtectedRouteAdmin from "./layout/ProtectedRouteAdmin";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<OrderItem />} />
          <Route
            path="books"
            element={
              <ProtectedRouteAdmin>
                <Products />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="add-book"
            element={
              <ProtectedRouteAdmin>
                <AddBookForm />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="categories"
            element={
              <ProtectedRouteAdmin>
                <Categlries />
              </ProtectedRouteAdmin>
            }
          />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/order/:bookId" element={<Order />} />
      </Routes>
      {/* </div> */}
      <Footer />
      <Toast />
    </>
  );
}

export default App;
