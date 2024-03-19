import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../../Context/Context";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import inStock from "../../../Container/Image/inStock.png";
import outOfStock from "../../../Container/Image/aa.webp";
import { LuCheckCheck } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const ProductView = () => {
  const navigator = useNavigate();

  const {
    productImageUrl,
    API_BASE_URL,
    product,
    PRODUCT_BASE_URL,
    fetchProduct,
    openToast,
    loader,
    setLoader,
  } = useContext(MainContext);

  // changeStatus
  const changeStatus = (id, new_status) => {
    axios
      .put(
        API_BASE_URL +
          PRODUCT_BASE_URL +
          "/change-status/" +
          id +
          "/" +
          new_status
      )
      .then((success) => {
        openToast(success.data.msg, "success");
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
        openToast(err.message);
      });
  };

  // change stock
  const changeStock = (id, new_status) => {
    axios
      .put(
        API_BASE_URL +
          PRODUCT_BASE_URL +
          "/change-stock/" +
          id +
          "/" +
          new_status
      )
      .then((success) => {
        openToast(success.data.msg, "success");
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
        openToast(err.message);
      });
  };

  // delete product
  const deleteProduct = (id, image) => {
    // console.log(id)
    setLoader(true);
    axios
      .delete(
        API_BASE_URL +
          PRODUCT_BASE_URL +
          "/delete/" +
          id +
          "/imageName/" +
          image
      )
      .then((success) => {
        openToast(success.data.msg);
        fetchProduct();
        setLoader(false);
      })
      .catch((err) => {
        openToast(err.msg);
        setLoader(false);
      });
  };

  // changeSellor
  const changeSellor = (id, new_sellor) => {
    axios
    .put(
      API_BASE_URL +
        PRODUCT_BASE_URL +
        "/change-sellor/" +
        id +
        "/" +
        new_sellor
    )
    .then((success) => {
      openToast(success.data.msg, "success");
      fetchProduct();
    })
    .catch((err) => {
      console.log(err);
      openToast(err.message);
    });
  };

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <>
      {/* add color button code */}
      <div className="w-full flex justify-end mt-5">
        <Link to="/admin/product/add">
          <button
            type="button"
            className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            <div className="flex gap-2 items-center">
              Add Product <FaCartPlus size={20} />
            </div>
          </button>
        </Link>
      </div>

      {/* List code */}
      {loader ? (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center w-full h-screen justify-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1={128}
              y1={32}
              x2={128}
              y2={64}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={224}
              y1={128}
              x2={192}
              y2={128}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={128}
              y1={224}
              x2={128}
              y2={192}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1={32}
              y1={128}
              x2={64}
              y2={128}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            />
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={24}
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  bestSellor
                </th>
                <th scope="col" className="px-6 py-3">
                  SR
                </th>

                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Colors
                </th>
                <th scope="col" className="px-6 py-3">
                  Stoke
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((d, i) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}
                  >
                    <td className="px-6 py-4">
                      <div>
                        {d.bestSellor == true ? (
                          <div
                            className="text-green-500"
                            onClick={() => {
                              changeSellor(d._id, false);
                            }}
                          >
                            <LuCheckCheck size={45} ml-3 />
                          </div>
                        ) : (
                          <div
                            className="text-red-500"
                            onClick={() => {
                              changeSellor(d._id, true);
                            }}
                          >
                            <IoMdClose size={45} ml-3 />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{i + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {d.name}
                    </th>
                    <td className="px-6 py-4">
                      <img
                        src={API_BASE_URL + productImageUrl + d.image}
                        className="w-8 md:w-16 max-w-full max-h-full"
                        alt={d.image}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        {d.status == true ? (
                          <div
                            className="text-green-500"
                            onClick={() => {
                              changeStatus(d._id, false);
                            }}
                          >
                            <FaCheckCircle size={45} ml-3 />
                          </div>
                        ) : (
                          <div
                            className="text-red-500"
                            onClick={() => {
                              changeStatus(d._id, true);
                            }}
                          >
                            <IoMdCloseCircle size={45} ml-3 />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{d.category.name}</div>
                    </td>

                    <td className="px-6 py-4 flex gap-2 items-center w-32 flex-wrap">
                      {d.color.map((d) => {
                        return (
                          <div
                            className="w-8 h-8 rounded-[50%]"
                            style={{ backgroundColor: `${d.slug}` }}
                          ></div>
                        );
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <img src="" alt="" />
                      {d.stock == true ? (
                        <img
                          src={inStock}
                          width={60}
                          height={60}
                          alt=""
                          onClick={() => {
                            changeStock(d._id, false);
                          }}
                        />
                      ) : (
                        <img
                          src={outOfStock}
                          alt=""
                          width={60}
                          height={60}
                          onClick={() => {
                            changeStock(d._id, true);
                          }}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <div
                          className="text-red-500 w-12 h-12 mt-2 inline-block"
                          onClick={() => {
                            deleteProduct(d._id, d.image);
                          }}
                        >
                          <MdOutlineDeleteForever size={30} />
                        </div>
                        <div
                          className="text-blue-500 w-12 h-12 mt-2 inline-block"
                          onClick={() => {
                            navigator("/admin/product/edit/" + d._id);
                          }}
                        >
                          <MdModeEditOutline size={30} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductView;
