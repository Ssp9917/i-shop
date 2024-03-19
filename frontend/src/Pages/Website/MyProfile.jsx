import React, { useState } from "react";
import Container from "../../Container/Website/Container";
import order from "../../Container/Image/order flipcart.svg";
import userImg from "../../Container/Image/user flip.svg";
import payment from "../../Container/Image/payment flip.svg";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";

const MyProfile = () => {
  const [profileMenu, setProfileMenu] = useState(false);

  const user = useSelector(store=>store.user)

  return (
    <Container>
      <div className="grid grid-cols-3 h-screen">
        <div className="">
          {/* left menu */}
          {/* user profile */}
          <div className="grid grid-cols-4 shadow-md h-16 m-4 items-center">
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 rounded-full border relative">

                <img src="" alt="" />
                <FaPlus className="absolute top-[14px] left-[15px]"/>
              </div>
            </div>
            <div className="col-span-3">
              <p>Hello,</p>
              <p>{user?.data?.name}</p>
            </div>
          </div>

          {/* Order */}
          <div className="grid grid-cols-4 shadow-md cursor-pointer  m-4 ">
            <div className="ps-3 w-16 h-16 flex justify-center items-center ">
              <img src={order} alt="" className="block" />
             
            </div>
            <div className="col-span-3">
              <div className="flex h-16 justify-between items-center">
                <span className="text-xl font-semibold ">MY ORDERS</span>{" "}
                <IoMdArrowDroprightCircle className="me-3" />
              </div>
            </div>
          </div>

          {/* User details */}
          <div
            className="grid grid-cols-4 shadow-md m-4 cursor-pointer duration-600 "
            onClick={() => {
              setProfileMenu(!profileMenu);
            }}
          >
            <div className="ps-3 w-16 h-16 flex justify-center items-center">
              <img src={userImg} alt="" className="block" />
            </div>
            <div className="col-span-3">
              <div className="flex h-16 justify-between items-center">
                <span className="text-xl font-semibold ">ACCOUNT SETTINGS</span>{" "}
                <IoMdArrowDroprightCircle className="me-3 " />
              </div>
            </div>
          </div>
          <div
            className={`${
              profileMenu ? "scale-y-[100%]" : "scale-y-[0%] hidden"
            }`}
          >
            <div className="flex justify-center items-center shadow-md mx-4 cursor-pointer ">
              <div className="p-1 ">
                <span>Personal Information</span>
              </div>
            </div>
            <div className="flex justify-center items-center shadow-md mx-4 cursor-pointer ">
              <div className="p-1 ">
                <span>Manage Address</span>
              </div>
            </div>
            <div className="flex justify-center items-center shadow-md mx-4 cursor-pointer ">
              <div className="p-1 ">
                <span>Manage Cards</span>
              </div>
            </div>
          </div>

          {/* Payment details */}

          <div className="grid grid-cols-4 shadow-md m-4 cursor-pointer">
            <div className="ps-3 w-16 h-16 flex justify-center items-center">
              <img src={payment} alt="" className="block" />
            </div>
            <div className="col-span-3">
              <div className="flex h-16 justify-between items-center">
                <span className="text-xl font-semibold ">Payments</span>{" "}
                <IoMdArrowDroprightCircle className="me-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 h-full ">
          <div className="mt-5 ml-4">
            <div className="text-xl font-medium mb-2">Personal Information</div>
            <div className="flex gap-4">
              <div className="w-56 h-10 border flex items-center pl-2">{user?.data?.name}</div>
              <div className="w-56 h-10 border flex items-center pl-2">SHARMA</div>
            </div>

            <div className="mt-4">Gender :</div>
            <div className="flex gap-4 ">
              <input type="radio" name="gender" className="cursor-pointer" defaultChecked HTMLfor='male'/> <span id="male" >Male</span>
              <input type="radio" name="gender" className="cursor-pointer" HTMLfor='female'/> <span id="female" className="cursor-pointer">Female</span>
              <input type="radio" name="gender" className="cursor-pointer" HTMLfor='other'/> <span id="other" className="cursor-pointer">Other</span>
            </div>


            <div className="text-xl font-medium mb-2 mt-8">Email address</div>
            <div className="w-56 h-10 border flex items-center pl-2">{user?.data?.email}</div>


            <div className="text-xl font-medium mb-2 mt-8">Mobail number</div>
            <div className="w-56 h-10 border flex items-center pl-2">+91 997898789</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
