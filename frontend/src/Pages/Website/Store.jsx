import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container/Website/Container";
import ProductBox from "./ProductBox";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { FaList } from "react-icons/fa";
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
    page,
    pageCount,
    prevHandler,
    nextHandler,
  } = useContext(MainContext);
  // limit filter
  const [limit, setLimit] = useState(5);
  // useParems
  const { category_slug } = useParams();
  // console.log(params)
  const [selColor, setSelColor] = useState(null);
  // useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.toString())
  const [filterMenu, setFilterMenu] = useState(false);
  // grid state
  const [grid, setGrid] = useState(true);
  // sort functionality
  const [sort, setSort] = useState("name");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  // console.log(priceFilter)

  // first render
  useEffect(() => {
    fetchCategory();
    fetchColor();
    setCat(0);

    // get and set search params
    console.log(searchParams.get("color_id"));
    if (searchParams.get("color_id")) {
      setSelColor(searchParams.get("color_id"));
    }
    if (searchParams.get("limit")) {
      setLimit(searchParams.get("limit"));
    }
  }, []);

  // change of limit color and category
  useEffect(() => {
    fetchProduct(
      limit,
      selColor,
      category_slug,
      sort,
      page,
      minPrice,
      maxPrice
    );
    const searchQuery = {
      limit,
    };
    if (selColor) {
      searchQuery.color_id = selColor;
    }

    if (sort) {
      searchQuery.sort = sort;
    }
    if (page) {
      searchQuery.page = page;
    }
    if (minPrice && maxPrice) {
      searchQuery.minPrice = minPrice;
      searchQuery.maxPrice = maxPrice;
    }

    setSearchParams(searchQuery);
  }, [limit, selColor, category_slug, sort, page, minPrice, maxPrice]);

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
              <Link to={"/store"}>
                {" "}
                <HiRefresh size={25} color="red" className="me-2" />
              </Link>
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
          <div className="bg-[#f6f7f8] m-4">
            <div className="text-[#22262A] flex justify-between font-bold text-xl ml-5 pt-4 pb-3">
              PRICES{" "}
              <HiRefresh
                size={25}
                color="red"
                className="me-2 cursor-pointer"
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(9999);
                }}
              />
            </div>
            <label for="minPrice">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              id="minPrice"
              name="minPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />{" "}
            <br />
            <label for="maxPrice">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
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
          <div className="bg-[#F6F7F8] flex items-center justify-between ml-4 mt-8 mr-4 relative">
            <div className="flex gap-5 pl-5 pt-2 pb-2">
              {/* limit function */}
              <div className="flex gap-2 items-center">
                <label htmlFor="">Show</label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              {/* sort function */}
              <div className="flex gap-2 items-center">
                <label htmlFor="">Sort By</label>
                <select
                  id="countries"
                  value={sort}
                  onChangeCapture={(e) => {
                    setSort(e.target.value);
                  }}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name">a to z</option>
                  <option value="-name">z to a</option>
                  <option value="price">low to high</option>
                  <option value="-price">high to low</option>
                </select>
              </div>
              {/* search filter */}

             <div className="w-[300px] relative">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder='search here'
                  />
                 
                </div>
                <button
                    type="submit"
                    class="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              
            </div>
            <div className="flex gap-5">
              <FcFilledFilter
                size={25}
                className="lg:hidden"
                onClick={() => {
                  setFilterMenu(!filterMenu);
                }}
              />
              <TfiLayoutGrid3Alt
                className={`${
                  grid ? "text-[#2678BF]" : "text-[#C1C8CE]"
                } hover: hidden md:block text-xl cursor-pointer`}
                onClick={() => setGrid(true)}
              />
              <FaList
                className={`${
                  !grid ? "text-[#2678BF]" : "text-[#C1C8CE]"
                }  text-xl mr-2 hidden md:block cursor-pointer`}
                onClick={() => setGrid(false)}
              />
            </div>

            {/* responsive menu */}
            <div
              className={`justify-center gap-3 ${
                filterMenu ? "block" : "hidden"
              } absolute duration-200 top-[68px] left-0 w-full z-[555] bg-white `}
            >
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
                  {category.map((d, i) => {
                    return <option value={d.name}>{d.name}</option>;
                  })}
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
                  {color.map((d, i) => {
                    return <option value={d.name}>{d.name}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* product listing */}
          <div
            className={`grid  ${
              grid ? "md:grid-cols-4  sm:grid-cols-2  gap-4" : "grid-cols-1"
            }`}
          >
            {product.map((prod, index) => {
              // console.log(prod)
              return <ProductBox {...prod} grid={grid} key={index} />;
            })}
          </div>

          {/* Pagination Div */}
          <div className="bg-[#F6F7F8] flex justify-center mt-3">
            <div
              onClick={() => {
                prevHandler();
              }}
              className={`cursor-pointer w-12 h-12 flex justify-center items-center ${
                page == 1 ? " text-gray-300" : "text-black"
              }`}
            >
              Prev
            </div>
            {Array(pageCount)
              .fill(null)
              .map((d, i) => {
                return (
                  <div
                    className={`w-12 h-12 flex justify-center items-center ${
                      page == i + 1 ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            <div
              onClick={() => {
                nextHandler();
              }}
              className={`cursor-pointer w-12 h-12 flex justify-center items-center ${
                page == pageCount ? " text-gray-300" : "text-black"
              }`}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Store;
