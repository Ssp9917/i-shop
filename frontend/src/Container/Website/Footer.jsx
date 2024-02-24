import React from "react";
import Container from "./Container";
import FooterImg from "../../Container/Image/ishop.svg";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import Visa from '../../Container/Image/visa.svg'
import WesternUnion from '../../Container/Image/Western_union.svg'
import Paypal from '../../Container/Image/Paypal.svg'
import MasterCard from '../../Container/Image/master_card.svg'


const Footer = () => {
  const ftrData = [
    {
      name: [
        {
          head: "Infomation",
        },
        {
          head: "Service",
        },
        {
          head: "Extras",
        },
        {
          head: "My Account",
        },
        {
          head: "Userful Links",
        },
        {
          head: "Our Offers",
        },
      ],
      list: [
        {
          listName: "About Us ",
        },
        {
          listName: "Infomation",
        },
        {
          listName: "Privacy Policy",
        },
        {
          listName: "Terms & Conditions",
        },
      ],
    },
  ];

  const ftrIcons = [
    {
      image:Visa,
    },
    {
      image:WesternUnion,
    },
    {
      image:Paypal,
    },
    {
      image:MasterCard,
    },
  ]

  return (
    <Container>
      <div className="w-full  flex flex-wrap pb-9 mb-5 border-b  justify-center gap-5 mt-16">
        <div className="w-[350px]">
          <img src={FooterImg} alt="" />
          <p className="mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever.Since the 1500s, when an unknown printer.
          </p>
        </div>
        <div className="w-[350px]">
          <p className="font-bold mb-3">Follow Us</p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been.
          </p>
          <div className="flex gap-5">
            <span className="text-blue-600">
              <FaFacebookF />
            </span>
            <span className="text-blue-600">
              <FaTwitter />
            </span>
          </div>
        </div>
        <div className="w-[220px]">
          <p className="font-bold mb-3">Contact Us</p>
          <p>
            iShop: address @building 124 Call us now: 0123-456-789 Email:
            support@whatever.com
          </p>
        </div>
      </div>
      <div >
        {ftrData.map((d, i) => {
          console.log(d);
          return (
            <div key={i} className=" flex flex-wrap justify-center gap-12">
              {d.name.map((data, i) => {
                return (
                  <div key={i}>
                    <p className="font-bold">{data.head}</p>
                    <ul>
                      {d.list.map((d, i) => {
                        return <li key={i}>{d.listName}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex gap-5 justify-end mt-4 pe-16 mb-5">
        {
          ftrIcons.map(
            (d,i)=>{
              return <img src={d.image} alt="" />
            }
          )
        }
      </div>
    </Container>
  );
};

export default Footer;
