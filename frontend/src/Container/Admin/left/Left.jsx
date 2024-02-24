import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Left = () => {
  const menu = [
    {
      name: "Dashboard",
      url: "/admin",
      image:<MdDashboard/>
    },
    {
      name: "Category",
      url: 'category',
      image:<MdOutlineCategory/>,
    },
    {
      name: "Color",
      url: 'color',
      image:<IoIosColorPalette/>
    },
    {
      name: "Product",
      url: 'product',
      image:<FaTruckArrowRight/>
    },
    {
      name: "Users",
      url: "user",
      image:<FaUserSecret/>
    }
  ];

  return (
    <div className="col-span-2 gradient h-screen text-xl">
      <div className="text-center my-2">
        <h1 className="text-red-500 text-4xl font-bold">Admin</h1>
      </div>
    
      <ul className="list-unstyled mt-8">
        {menu.map((d,i) => {
          return(
            <Link to={d.url} key={i}>
            <li className="my-2 mx-3 bg-white pt-2 pb-2 rounded-3xl border-e-[#ff6e40]-2 pl-6 cursor-pointer  flex items-center justify-around bg-[rgba(111,214,255,0.85)]" >
            <div  className="text-red-500 w-8 h-8 rounded-[50%] bg-black relative" > <span className="absolute top-[6px] left-[7px]">{d.image}</span></div>
            <div className="text-[#ff6e40] font-bold">{d.name}</div>
            <div className="text-[#ff6e40]"><FaLongArrowAltRight/></div>
          </li>
          </Link>
          )
        })}
      </ul>
    </div>
  );
};
 
export default Left;
