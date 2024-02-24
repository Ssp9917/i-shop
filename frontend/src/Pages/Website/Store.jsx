import React from "react";
import Container from "../../Container/Website/Container";
import iphone from "../../Container/Image/iphone_8.png";
import ProductBox from "./ProductBox";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaList } from "react-icons/fa";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import Corousel from "../../Container/Image/2_corousel.png";

const Store = () => {
  const accesories = [
    {
      name: "Apple Car",
    },
    {
      name: "Air port & wireless",
    },
    {
      name: "Cables & Docks",
    },
    {
      name: "Cases & Films",
    },
    {
      name: "Charging Devices",
    },
    {
      name: "Connected home",
    },
    {
      name: "Headphones",
    },
  ];

  const colorNames = [
    {
      name: "blue",
    },
    {
      name: "red",
    },
    {
      name: "black",
    },
    {
      name: "yellow",
    },
    {
      name: "pink",
    },
    {
      name: "gray",
    },
  ];

  const brand = [
    {
      name: "Apple",
    },
    {
      name: "LG",
    },
    {
      name: "Samsung",
    },
    {
      name: "Siemens",
    },
  ];

  return (
    <Container>
      <div className="w-full h-10 bg-[#F6F7F8] m-2 flex justify-center items-center text-[#33A0FF] text-lg font-medium tracking-wider">
        Store/Accessories
      </div>

      <div className="grid grid-cols-12">
        <div className="lg:block hidden col-span-3 ">
          {/* ACCESORIES */}
          <div className=" bg-[#F6F7F8] m-4">
            <div className="text-[#22262A] font-bold text-xl ml-5 pt-4 pb-3">
              ACCESORIES
            </div>

            <ul>
              {accesories.map((d, i) => {
                return (
                  <li className="ml-5 text-lg font-[500] mt-3 text-[#262626]  hover:text-[#53a9ff] duration200 cursor-pointer">
                    {d.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Prices */}
          <div className="bg-[#f6f7f8] m-4 h-36">
            <div className="text-[#22262A] font-bold text-xl ml-5 pt-4 pb-3">
              PRICES
            </div>

           {/* Multi Range Slider  */}

           <MultiRangeSlider min={0} max={1000}/>
          </div>

          {/* Color */}
          <div className="bg-[#f6f7f8] m-4 ">
            <div className="text-[#22262A] font-bold text-xl ml-5 pt-4 pb-3">
              COLOR
            </div>

            <div className="flex gap-4 p-2">
              {colorNames.map((d, i) => {
                return (
                  <div
                    key={i}
                    className={`w-[30px] h-[30px] rounded-full border`}
                    style={{
                      background: d.name,
                    }}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Brand */}
          <div className="bg-[#f6f7f8] m-4 ">
            <div className="text-[#22262A] font-bold text-xl ml-5 pt-4 pb-3">
              Brand
            </div>

            <ul>
              {brand.map((d, i) => {
                return (
                  <li className="ml-5 text-lg font-[500] mt-3 text-[#262626]  hover:text-[#53a9ff] duration200 cursor-pointer">
                    {d.name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* More Button */}
          <div className="bg-[#f6f7f8] m-4 flex justify-center items-center text-lg pt-2 pb-2">
            MORE
          </div>
        </div>

        <div className="lg:col-span-9 col-span-12">
          <div className=" sm:h-[340px] relative h-[400px]  bg-[#2E90E5] m-4 sm:flex sm:justify-between">
            <div className="text-white flex flex-col flex-1 justify-center gap-4">
              <div className="text-5xl pl-4 pt-4">iPhone 8</div>
              <div className="pl-4">
                Performance and design. Taken right <br /> to the edge.
              </div>
              <button className="w-28 ml-2 border-b ">SHOP NOW</button>
            </div>
            <div className=" absolute bottom-0 right-0">
              <img src={iphone} className="md:block hidden" alt="" />
              <img src={Corousel} className="md:hidden block w-[280px]  ml-4" alt="" />
            </div>
          </div>

          <div className="bg-[#F6F7F8] flex items-center justify-between ml-4 mr-4">
            <div className="flex gap-5 pl-5 pt-2 pb-2">
              <div>13 items</div>
              <div>
                Sort By
                <select name="" id="">
                  <option value="Name">Name</option>
                </select>
              </div>
            </div>
            <div className="flex gap-5">
              <TfiLayoutGrid3Alt className="text-[#C1C8CE] hover:text-[#2678BF]  text-xl" />
              <FaList className="text-[#C1C8CE] hover:text-[#2678BF]  text-xl mr-2" />
            </div>
          </div>

          {/* items div */}
          <ProductBox />

          {/* Pagination Div */}
          <div className="bg-[#F6F7F8] flex justify-center mt-3">
            <div className="w-12 h-12 flex justify-center items-center">1</div>
            <div className="w-12 h-12 flex justify-center items-center">2</div>
            <div className="w-12 h-12 flex justify-center items-center">3</div>
            <div className="w-12 h-12 flex justify-center items-center">4</div>
            <div className="w-12 h-12 flex justify-center items-center">5</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Store;
