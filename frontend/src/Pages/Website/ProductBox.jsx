import React from "react";
import Container from "../../Container/Website/Container";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import AppleMacBookAir from "../../Container/Image/Apple Macbook Air.png";
import AppleiPad2A from "../../Container/Image/ipod-touch-select-blue-2019_GEO_US_FMT_WHH.png";
import AppleiPhone11 from "../../Container/Image/Apple iPhone 11.png";
import AppleWatch from "../../Container/Image/Apple Watch 21-1.png";
import AppleAirPods from "../../Container/Image/apple_airpods.png";
import AppleiPad from "../../Container/Image/Apple Ipad.png";
import AppleSmartWatch from "../../Container/Image/Apple Smartwatch Magic.png";
import AppleMacBook from "../../Container/Image/apple_macbook.png";

const ProductBox = () => {
  const bestSellerItem = [
    {
      image: AppleMacBook,
      productName: "Apple Macbook Pro",
      new_price: 499,
      old_price: 599,
      rating: 4,
      tag: true,
    },
    {
      image: AppleiPad2A,
      productName: "Apple iPad 2A",
      new_price: 499,
      old_price: 599,
      rating: 3,
      tag: false,
    },
    {
      image: AppleMacBookAir,
      productName: "Apple MacBook Air",
      new_price: 499,
      old_price: 599,
      rating: 2,
      tag: true,
    },
    {
      image: AppleMacBookAir,
      productName: "Apple MacBook Air",
      new_price: 499,
      old_price: 599,
      rating: 5,
      tag: false,
    },
    {
      image: AppleiPhone11,
      productName: "Apple iPhone 11",
      new_price: 499,
      old_price: 599,
      rating: 3,
      tag: true,
    },
    {
      image: AppleAirPods,
      productName: "Apple Air Pods",
      new_price: 499,
      old_price: 599,
      rating: 4,
      tag: true,
    },
    {
      image: AppleiPad,
      productName: "Apple iPad",
      new_price: 499,
      old_price: 599,
      rating: 1,
      tag: false,
    },
    {
      image: AppleSmartWatch,
      productName: "Apple Smart Watch",
      new_price: 499,
      old_price: 599,
      rating: 5,
      tag: true,
    },

    {
      image: AppleWatch,
      productName: "Apple Watch 21.1",
      new_price: 499,
      old_price: 599,
      rating: 3,
      tag: true,
    },
  ];

  return (
    <Container>
      <div className="flex flex-wrap gap-4 justify-center">
        {bestSellerItem.map((d, i) => {
          return (
            <div key={i} className="w-[236px] hover:shadow-2xl mt-5">
              {d.tag ? <div className="w-12 h-8 bg-[#FF4858] text-white flex justify-center items-center font-[600]" >HOT</div> : ""}

              <img src={d.image} alt="macbook" className="h-[px]" />
              <h2 className="text-center font-semibold">{d.productName}</h2>
              <ul className="flex justify-center gap-1 mt-2 mb-2">
                <Stars yellow={d.rating} />
              </ul>
              <div className="flex gap-5 justify-center">
                <p className="text-red-700 font-medium">${d.new_price}</p>
                <p className="line-through">${d.old_price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ProductBox;

function Stars({ yellow }) {
  let stars = [];
  let white = 5 - stars;

  for (let i = 1; i <= 5; i++) {
    if (i < yellow) {
      stars.push(<FaStar color="#FFC600" />);
    } else {
      stars.push(<FaStar color="#C1C8CE" />);
    }
  }

  return <>{stars}</>;
}
