import React, { useState } from "react";
import Container from "./Container";
import { FaCaretDown } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import Ishop from "../Image/iSHOP Logo.svg";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FaUserSecret } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { logOut } from "../../reducers/userSlice";
import { emptyCart } from "../../reducers/cartSlice";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatcher = useDispatch()

  // console.log(cart);

  const navItems = [
    {
      path: "/",
      name: "HOME",
    },
    {
      path: "/store",
      name: "STORE",
    },
    {
      path: "/iphone",
      name: "IPHONE",
    },
    {
      path: "/ipad",
      name: "IPAD",
    },
    {
      path: "/macbook",
      name: "MACBOOK",
    },
    {
      path: "/accesories",
      name: "ACCESORIES",
    },
  ];

  return (
    <div className="sticky pb-3 top-0 bg-white z-[9999]">
      <Container>
        {/* top row */}
        <div className="hidden  sm:justify-between mt-1  sm:flex px-3 pe-3">
          <div className="flex items-center gap-3">
            <span>EN</span>
            <FaCaretDown />

            <span>₹</span>
            <FaCaretDown />
          </div>

          <div className="flex items-center gap-5">
            {user.data == null ? (
              <Link to="/login" className="flex items-center gap-3">
                <LuLogIn size={20} color="blue" />
                <span>Login</span>
              </Link>
            ) : (
              <>
                <Link to="/myProfile" className="flex items-center gap-3">
                  <FaUserTie size={20} color="blue" />
                  <span>Hii, {user.data.name}</span>
                </Link>
                <Link to="/" onClick={()=>{
                  dispatcher(logOut())
                  dispatcher(emptyCart())
                }} className="flex items-center gap-3">
                  <LuLogOut size={20} color="blue" />
                  <span>Logout</span>
                </Link>
              </>
            )}
            <Link to="/cart" className="flex items-center gap-5">
              <IoBagAdd size={20} color="blue" />
              <span>{cart.data.length} Items</span>
              <span className="text-gray-300">₹{cart.total}</span>
            </Link>
            <span className="pl-12">
              <FaSearch size={20} color="red" />
            </span>
          </div>
        </div>

        {/* logo */}
        <div className="flex px-3 sm:items-center w-full justify-start sm:justify-center pt-4 relative">
          <img src={Ishop} alt="" />
          <AiOutlineBars
            onClick={() => setMenu(true)}
            className="sm:hidden text-3xl absolute right-3"
          />
        </div>

        {/* menu */}
        <ul
          className="hidden sm:flex justify-center gap-12 mt-4
        "
        >
          {navItems.map((d, i) => {
            // console.log(d);
            return (
              <li
                key={i}
                className="hover:text-blue-500 text-[14px] navListItems font-bold mb-3"
              >
                <Link to={d.path}>{d.name}</Link>
              </li>
            );
          })}
        </ul>

        {/* mobail responsive menu */}

        <div
          className={`${
            menu == true ? "left-0" : "left-[-100%]"
          }  w-full h-screen  fixed top-0 mobailMenuBg z-[999] duration-300`}
        >
          {/* Close Icons */}
          <IoClose
            onClick={() => setMenu(false)}
            color="red"
            className="text-4xl text-white absolute right-2 top-2"
          />

          {/* cart responsive */}
          <div className="max-w-[400px] mx-auto mt-20 h-[40px] ">
            <div className="ms-8 flex justify-between">
              <Link to={"/cart"} onClick={() => setMenu(false)}>
                <div className="flex gap-3 items-center text-white">
                  <TfiShoppingCartFull size={25} color="red" />
                  <span>{cart.data.length} items</span>
                  <span className="text-gray-100">₹ {cart.total}</span>
                </div>
              </Link>
              <div className="flex me-6 gap-3 items-center text-white">
                <FaUserSecret size={25} color="red" />
                <span>My Profile</span>
              </div>
            </div>
            <div className="w-[90%] mx-auto h-2 mt-1  rounded bg-blue-500 "></div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-10 ml-5 mr-5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
          </div>

          <ul className="text-white font-bold text-lg flex flex-col justify-center items-center gap-5 mt-12">
            {navItems.map((d, i) => {
              return (
                <Link to={d.path} key={i}>
                  <li
                    onClick={() => setMenu(false)}
                    className="text-blue-500 responsive-menu relative"
                  >
                    {d.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Header;
