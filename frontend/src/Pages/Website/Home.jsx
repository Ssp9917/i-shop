import React from "react";
import Container from "../../Container/Website/Container";
import Corousel from "../../Container/Image/2_corousel.png";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import Shiping from "../../Container/Image/shipping.svg";
import Refund from "../../Container/Image/refund.svg";
import Support from "../../Container/Image/support.svg";
import BeatsSolo from "../../Container/Image/beats_solo_2.png";
import Hsquared from "../../Container/Image/H-squared.png";
import Netatmo_rain from "../../Container/Image/Netatmo_rain.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductBox from "./ProductBox";




const Home = () => {
  return (
    <>
      <Container
        fluid
        extraClass="md:h-[650px] h-[400px] mt-5"
        style={{
          background:
            "linear-gradient(67deg, #e71d3a 0%, #ecc7c1 45%, #efcac4 58%, #e4bdb8 70%, #42a8fe 100%) 0% 0% no-repeat",
        }}
      >
        <Container>
          <div className="relative md:h-[650px] h-[400px]">
            <img src={Corousel} alt="" className="absolute right-0 bottom-0  h-full" />
          </div>
        </Container>
      </Container>
      <BestSellor />
      <Offer />
      <Service />
      <Featured />
    </>
  );
};

export default Home;

export function BestSellor() {
  const category = [
    {
      name: "All",
    },
    {
      name: "Mac",
    },
    {
      name: "iPhone",
    },
    {
      name: "iPad",
    },
    {
      name: "iWatch",
    },
    {
      name: "Accessories",
    },
  ];

 

  return (
    <Container>
      <h1 className="text-3xl text-center font-bold mt-3">Best Seller</h1>
      <ul className="hidden sm:flex justify-center gap-5 mt-2 ">
        {category.map((d, i) => {
          return (
            <li key={i} className="hover:text-blue-600 font-[600]">
              {d.name}
            </li>
          );
        })}
      </ul>
      <div className="ps-3 pe-3 sm:hidden">
        <label
          for="countries"
          className="block mb-2  font-medium text-gray-900 text-md"
        >
          Select an category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {category.map((d, i) => {
            return <option key={i}>{d.name}</option>;
          })}
        </select>
      </div>

      <div>
        <ProductBox/>
      </div>
    </Container>
  );
}

export function Offer() {

  return (
    <Container fluid extraClass="bg-[#2e90e5]">
      <Container>
        <div className="md:flex flex-col md:flex-row w-full lg:h-[555px] md:h-[435px] sm:h-[435px] h-[507px] relative  mt-20 ">
          <div className="md:w-[50%] w-full flex justify-start pt-0 pl-4 md:pl-0 md:pt-0 items-center ">
            <div className="  flex  gap-5 flex-col">
            <h1 className="text-6xl text-white ">iPhone 6 Plus</h1>
            <p className="text-white font-[500]">
              Performance and design. Taken <br /> right to the edge.
            </p>
            <p className="text-white font-bold">SHOP NOW</p>
            </div>
          </div>
          <div className="lg:w-full absolute lg:-top-16  md:-top-20 sm:w-[475px]  sm:-top-20  w-[320px] top-40 right-0  md:-right-0">
            <img src={Corousel} alt="" className="sm:absolute sm:right-0 " />
          </div>
        </div>
      </Container>
    </Container>
  );
}

function Service() {

  const service = [
    {
      image: Shiping,
      service_name: "FREE SHIPPING",
      service_description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, commodi? Non et !",
    },
    {
      image: Refund,
      service_name: "100% REFUND",
      service_description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, commodi? Non et !",
    },
    {
      image: Support,
      service_name: "SUPPORT 24/7",
      service_description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, commodi? Non et !",
    },
  ];

  return (
    <Container>
      <div className="mt-5 flex justify-center gap-4 flex-wrap ">
        {service.map((d, i) => {
          return (
            <div
              key={i}
              className="w-[300px] flex justify-center items-center flex-col gap-4"
            >
              <img src={d.image} alt="" />
              <p className="font-bold">{d.service_name}</p>
              <p className="text-center">{d.service_description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export function Featured() {

  const featured = [
    {
      image: BeatsSolo,
      name: "Beats Solo 2 On Ear Headphones - Black",
      new_price: 499,
      old_price: 599,
    },
    {
      image: Hsquared,
      name: "H-Squared tvTray",
      new_price: 499,
      old_price: 599,
    },
    {
      image: Netatmo_rain,
      name: "Netatmo Rain Gauge",
      new_price: 499,
      old_price: 599,
    },
    {
      image: Netatmo_rain,
      name: "Netatmo Rain Gauge",
      new_price: 499,
      old_price: 599,
    },
    {
      image: BeatsSolo,
      name: "Beats Solo 2 On Ear Headphones - Black",
      new_price: 499,
      old_price: 599,
    },
    {
      image: Hsquared,
      name: "H-Squared tvTray",
      new_price: 499,
      old_price: 599,
    },

  ];

  const settings = {
    
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  return (

    

    <Container>

      <h1 className="text-3xl font-bold text-center mt-8">FEATURED PRODUCTS</h1>

      <div className="mt-10 relative">
      <Slider {...settings}>
        {featured.map((d, i) => {
          return (
            <div className="hover:shadow-2xl w-[300px] pl-8 changeDisplay" key={i}>
              <div  className="w-[150px]">
              <img src={d.image} alt=""/>

              </div>
              <div className="text-center w-[150px]">
                <p>{d.name}</p>
                <ul className="flex justify-center gap-1 mt-2 mb-2">
                  <li className="text-yellow-400">
                    <FaStar />
                  </li>
                  <li className="text-yellow-400">
                    <FaStar />
                  </li>
                  <li className="text-yellow-400">
                    <FaStar />
                  </li>
                  <li className="text-yellow-400">
                    <FaStar />
                  </li>
                  <li className="text-yellow-400" i>
                    <FaStarHalf />
                  </li>
                </ul>
                <div className="flex gap-3 justify-center">
                  <p className="text-red-600 font-[600]">${d.new_price}</p>
                  <p className="line-through">${d.old_price}</p>
                </div>
              </div>
            </div>
          );
        })}
        </Slider>
      </div>
    </Container>
   
  );
}
