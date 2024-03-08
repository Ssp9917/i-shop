import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container/Website/Container";
import ProductBox from "./ProductBox";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaList } from "react-icons/fa";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { MainContext } from "../../Context/Context";
import Slider from "react-slick";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LuCheckCheck } from "react-icons/lu";
import { HiRefresh } from "react-icons/hi";
import { GrRadialSelected } from "react-icons/gr";
import { FcFilledFilter } from "react-icons/fc";

const Store = () => {
  const {
    setCat,
    category,
    fetchCategory,
    API_BASE_URL,
    categoryImageUrl,
    color,
    fetchColor,
    fetchProduct,
    product,
    setisHome,
  } = useContext(MainContext);
  // limit filter
  const [limit, setLimit] = useState(0);
  // useParems
  const { category_slug } = useParams();
  // console.log(params)
  const [selColor, setSelColor] = useState(null);
  // useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();


  // first render
  useEffect(() => {
    fetchCategory();
    fetchColor();
    setCat(0);

    // get and set search params
    if (searchParams.get("color_id")) {
      setSelColor(searchParams.get("color_id"));
    }
    if (searchParams.get("limit")) {
      setLimit(searchParams.get("limit"));
    }
  }, []);

  // change of limit color and category
  useEffect(() => {
    fetchProduct(limit, selColor, category_slug);
    const searchQuery = {
      limit,
    };
    if (selColor) {
      searchQuery.color_id = selColor;
    }

    setSearchParams(searchQuery);
  }, [limit, selColor, category_slug]);

 

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

  // slider code
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Container>
      <div className="w-full h-10 bg-[#F6F7F8] m-2 flex justify-center items-center text-[#33A0FF] text-lg font-medium tracking-wider">
        Store/Accessories
      </div>

      <div className="grid grid-cols-12">
        <div className="lg:block hidden col-span-3 ">
          {/* ACCESORIES */}
          <div className=" bg-[#F6F7F8] m-4 mt-0">
            <div className="text-[#22262A] font-bold text-xl ml-5 pt-4 pb-3 flex justify-between items-center ">
              Categories
              <HiRefresh size={25} color="red" className="me-2" />
            </div>

            <ul>
              <Link to={"/store/"}>
                <li className="ml-5 flex items-center text-lg font-[500] mt-3 text-[#262626]  hover:text-[#53a9ff] duration200 cursor-pointer">
                  <GrRadialSelected
                    size={17}
                    color="red"
                    className={`${
                      category_slug == null ? "opacity-100" : "opacity-0"
                    } me-2`}
                  />
                  All
                </li>
              </Link>
              {category.map((d, i) => {
                return (
                  <Link to={"/store/" + d.slug}>
                    <li className="ml-5 flex items-center text-lg font-[500] mt-3 text-[#262626]  hover:text-[#53a9ff] duration200 cursor-pointer">
                      <GrRadialSelected
                        size={17}
                        color="red"
                        className={`${
                          category_slug == d.slug ? "opacity-100" : "opacity-0"
                        } me-2`}
                      />
                      {d.name}
                    </li>
                  </Link>
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

            <MultiRangeSlider min={0} max={1000} />
          </div>

          {/* Color */}
          <div className="bg-[#f6f7f8] m-4  ">
            <div className="text-[#22262A] flex justify-between items-center font-bold text-xl ml-5 pt-4 pb-3">
              COLOR
              <HiRefresh
                onClick={() => {
                  setSelColor(null);
                }}
                size={25}
                color="red"
                className="me-2"
              />
            </div>

            <div className="flex gap-4 p-2">
              {color.map((d, i) => {
                return (
                  <div
                    key={i}
                    className={`w-[30px] relative h-[30px] rounded-full border `}
                    style={{
                      background: d.slug,
                    }}
                    onClick={() => setSelColor(d._id)}
                  >
                    <div
                      className={`absolute w-full h-full flex justify-center items-center ${
                        selColor == d._id ? "block" : "hidden"
                      }`}
                    >
                      <LuCheckCheck color="white" size={20} />
                    </div>
                  </div>
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
                  <li
                    key={i}
                    className="ml-5 text-lg font-[500] mt-3 text-[#262626]  hover:text-[#53a9ff] duration200 cursor-pointer"
                  >
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
        {/* Slider */}
        <div className="lg:col-span-9 col-span-12">
          <Slider {...settings}>
            {category.map((d) => {
              return (
                <div className=" sm:h-[340px] relative h-[400px] b1  sm:flex sm:justify-between">
                  <div className="text-black flex flex-col flex-1 justify-center gap-4">
                    <div className="text-5xl pl-7 pt-4">{d.name}</div>
                    <div className="pl-7">
                      Performance and design. Taken right <br /> to the edge.
                    </div>
                    <Link to={"/store/" + d.slug}>
                      <button className="w-28 ml-8 border-b ">SHOP NOW</button>
                    </Link>
                  </div>
                  <div className=" absolute bottom-0 right-0">
                    {/* <img src={iphone} className="md:block hidden" alt="" /> */}
                    <img
                      src={API_BASE_URL + categoryImageUrl + d.image}
                      className="md:hidden block w-[280px] ml-4"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
            {/* filter menu */}
          <div className="bg-[#F6F7F8] flex items-center justify-between ml-4 mt-8 mr-4">
            <div className="flex gap-5 pl-5 pt-2 pb-2">
              <div className="flex gap-2 items-center">
                <label htmlFor="">Show</label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setLimit(e.target.value)}
                  value={limit}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="0">All</option>
                </select>
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="">Sort By</label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setLimit(e.target.value)}
                >
                  <option value="a to z">a to z</option>
                  <option value="z to a">z to a</option>
                  <option value="low to high">low to high</option>
                  <option value="high to low">high to low</option>
                </select>
              </div>
             
            </div>
            <div className="flex gap-5">
              <FcFilledFilter size={25} className="lg:hidden" />
              <TfiLayoutGrid3Alt className="text-[#C1C8CE] hover:text-[#2678BF]  text-xl" />
              <FaList className="text-[#C1C8CE] hover:text-[#2678BF]  text-xl mr-2" />
            </div>

           
          </div>
            {/* responsive menu */}
          <div className="justify-center gap-3 hidden">
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a category
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                   
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a color
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                   
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>


            {/* product listing */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {product.map((prod, index) => {
              // console.log(prod)
              return <ProductBox {...prod} key={index} />;
            })}
          </div>

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
