import { Link } from "react-router-dom";
import { CiFacebook, CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";

import store from "../assets/appstore.png";
import footerpng from "../assets/footerpng.png";
const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="bg-[#282828] mt-40 p-4">
      <div className="flex gap-4 text-[#868686] container m-auto py-20 justify-between flex-col md:flex-row">
        <div className="">
          {/* <img src={logo} alt="" /> */}
          <Link to="/" className="text-white text-3xl">
            GyanGhor
          </Link>
          <p className="my-8">
            1418 River Drive, Suite 35 <br />
            Cottonhall, CA 9622
          </p>
          <p className="mb-8">
            Monday – Friday: 9:00-20:00
            <br />
            Saturday: 11:00 – 15:00
          </p>
          <p className="text-white text-xl">contact@example.com</p>
        </div>
        <div className="">
          <p className="text-orange-500 text-xl mb-4">Useful Links</p>
          <Link to="/" className="hover:text-white mb-2 inline-block">
            Home
          </Link>
          <br />
          <Link to="/about" className="hover:text-white mb-2 inline-block">
            About
          </Link>
          <br />
          <Link to="/books" className="hover:text-white mb-2 inline-block">
            All Books
          </Link>
          <br />
          <Link to="/contact" className="hover:text-white mb-2 inline-block">
            Contact
          </Link>
        </div>
        <div className="">
          <h4 className="text-orange-500 text-xl mb-4">Install App</h4>
          <p>From App Store or Google Play</p>
          <Link to="/" className="hover:text-white mb-2 inline-block mt-4">
            <img src={store} alt="" />
          </Link>
          <p className="mb-4">Follow Us</p>
          <Link
            to="/"
            className="hover:text-white mb-2 inline-block text-3xl inline-block mr-2"
          >
            <CiFacebook />
          </Link>
          <Link
            to="/"
            className="hover:text-white mb-2 inline-block text-3xl inline-block mr-2"
          >
            <CiYoutube />
          </Link>
          <Link
            to="/"
            className="hover:text-white mb-2 inline-block text-3xl inline-block mr-2"
          >
            <CiInstagram />
          </Link>
          <Link
            to="/"
            className="hover:text-white mb-2 inline-block text-3xl inline-block mr-2"
          >
            <CiLinkedin />
          </Link>
          <Link
            to="/about"
            className="hover:text-white mb-2 inline-block text-3xl inline-block mr-2"
          >
            <CiTwitter />
          </Link>
        </div>
      </div>
      <div className="py-8 border-t border-[#444] container m-auto flex justify-between flex-col md:flex-row ">
        <p className="text-white my-4">
          Copyright © {year} GyanGhor. All rights reserved.
        </p>
        <p className="text-orange-500 my-4">Call: +8801744784848</p>
        <img src={footerpng} alt="" className="h-[30px] mt-4" />
      </div>
    </div>
  );
};

export default Footer;
