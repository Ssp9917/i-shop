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



const Header = () => {

  const [menu,setMenu] = useState(false)

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
    <>
      <Container fluid extraclassName="shadow">
        <Container>
          <div className="hidden sm:justify-between  sm:flex px-3 pe-3">
            <div className="flex items-center gap-3">
              <span>EN</span>
              <FaCaretDown />

              <span>$</span>
              <FaCaretDown />
            </div>

            <div className="flex items-center gap-5">
              <FaUserTie />
              <span>My Profile</span>

              <IoBagAdd />
              <span>0 Items</span>

              <span className="text-gray-300">$998</span>
              <span className="pl-12">
                <FaSearch />
              </span>
            </div>
          </div>
        </Container>
      </Container>
      <Container>
        <div className="flex px-3 sm:items-center w-full justify-start sm:justify-center pt-4 relative">
          <img src={Ishop} alt="" />
          <AiOutlineBars onClick={()=>setMenu(true)} className="sm:hidden text-3xl absolute right-3" />
        </div>
      </Container>
      <Container>
        <ul
          className="hidden sm:flex justify-center gap-12 mt-4
        "
        >
          {navItems.map((d, i) => {
            // console.log(d);
            return (
              <li
                key={i}
                className="hover:text-red-400 text-[14px] navListItems font-bold mb-3"
              >
                <Link to={d.path}>{d.name}</Link>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* mobail responsive menu */}

      <Container>
        <div className={`${menu==true?'left-0':'left-[-100%]'}  w-full h-screen  fixed top-0 mobailMenuBg z-[999] duration-300`}>

          {/* Close Icons */}
          <IoClose onClick={()=>setMenu(false)} className="text-4xl text-white absolute right-2 top-2"/>

          {/* Search Bar */}
          <div className="relative mt-16 ml-5 mr-5">
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
          
          </div>

          <ul className="text-white font-bold text-lg flex flex-col justify-center items-center gap-10 mt-16">
            {
              navItems.map(
                (d,i)=>{
                  return(
                    <Link to={d.path} key={i}>
                      <li>{d.name}</li>
                    </Link>
                  )
                }
              )
            }
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Header;
