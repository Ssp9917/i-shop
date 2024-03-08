import React, { useContext, useRef, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../Context/Context";
import axios from "axios";

const CategoryView = () => {
  const [togle, setTogle] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    openToast,
    category,
    fetchCategory,
    categoryImageUrl,
    CATEGORY_BASE_URL,
    API_BASE_URL,
  } = useContext(MainContext);
  const nameRef = useRef();
  const slugRef = useRef();
  const categoryIdRef = useRef();
  const oldNameRef = useRef();

  const catToSlug = () => {
    const slug = nameRef.current.value
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .trim();
    slugRef.current.value = slug;
  };

  // add data

  const categorySubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const slug = event.target.slug.value;
    const image = event.target.image.files[0];

    if ((name != "" && slug != "")) {
      // creat form data to send image
      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", image);

      if(isUpdate){
        const cId = event.target.category_id.value;
        formData.append('old_name',event.target.old_name.value)
        axios
        .put(API_BASE_URL + CATEGORY_BASE_URL + "/update/" + cId, formData)
        .then((success) => {
          if (success.data.status == 1) {
            event.target.reset();
            setTogle(false);
            openToast(success.data.msg, 'success');
            fetchCategory();
          }else{
            openToast(success.data.msg,'error')
          }
        }).catch(
          (err)=>{
            console.log(err)
          }
        );

      }else{
        axios
        .post(API_BASE_URL + CATEGORY_BASE_URL + "/create", formData)
        .then((success) => {
          if (success.data.status == 1) {
            event.target.reset();
            setTogle(false);
               fetchCategory();
          }else{
            openToast(success.data.msg,'error')
          }
        }).catch(
          (err)=>{
            console.log(err)
          }
        );
      }


     
    }
  };

  // delete Api

  const deleteHandler = (id,image) => {
    // console.log(API_BASE_URL + CATEGORY_BASE_URL + "/delete/" + id +);
    axios
      .delete(API_BASE_URL + CATEGORY_BASE_URL + "/delete/" + id + '/name/' + image)
      .then((success) => {
        console.log(success);
        openToast(success.data.msg, "success");
        fetchCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // change status function
  const changeStatus = (id, new_status) => {
    axios
      .put(
        API_BASE_URL +
          CATEGORY_BASE_URL +
          "/change-status/" +
          id +
          "/" +
          new_status
      )
      .then((success) => {
        if (success.data.status) {
          openToast(success.data.msg, "success");
          fetchCategory();
        } else {
          openToast(success.data.msg, "error");
        }
      });
  };

  // edit data api
  const editHandler = (category) => {
    // console.log(category)
    categoryIdRef.current.value = category._id
    nameRef.current.value = category.name;
    slugRef.current.value = category.slug;
    oldNameRef.current.value = category.image;
    setTogle(true);
  };

  return (
    <>
      <div
        className={`${
          togle ? "flex" : "hidden"
        } w-full h-screen z-[9999] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)]  justify-center items-center`}
      >
        <div className="w-[600px] h-[400px] bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl ps-3 font-semibold">
              {isUpdate ? "Edit " : "Add "}
              Category
            </h2>
            <div
              className="text-red-500 text-3xl pe-3"
              onClick={() => setTogle(false)}
            >
              <IoClose />
            </div>
          </div>
          <hr className="!border-t-2 mt-3" />

          {/* form started */}
          {/* encType="multipart/form-data" for file upload in form */}
          <form
            className="m-4"
            encType="multipart/form-data"
            onSubmit={categorySubmitHandler}
          >
            <div className="mb-3">
              {/* hidden inputes */}
              <input type="hidden" ref={categoryIdRef} name="category_id" />
              <input type="hidden" ref={oldNameRef} name="old_name" />

              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameRef}
                onChange={catToSlug}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your category"
                required
              />
            </div>
            <div className="mb-3">
              <label
                for="slug"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Slug
              </label>
              <input
                type="text"
                id="slug"
                readOnly
                name="slug"
                ref={slugRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label
                for="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isUpdate ? "Save" : "Add"}
            </button>
          </form>
          {/* form ended */}
        </div>
      </div>

      <div className="w-full flex justify-end mt-5">
        <button
          type="button"
          onClick={() => {
            setTogle(true);
            setIsUpdate(false);
          }}
          className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          <div className="flex gap-2 items-center">
            Add Category <FaCartPlus size={20} />
          </div>
        </button>
      </div>
      {/* // table code start */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SR
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((d, i) => {
              // console.log(d)
              // console.log(API_BASE_URL + categoryImageUrl + d.image);
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                  <td className="px-6 py-4">{i + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {d.name}
                  </th>
                  <td className="px-6 py-4">{d.slug}</td>
                  <td className="px-6 py-4">
                    <img
                      src={API_BASE_URL + categoryImageUrl + d.image}
                      className="w-8 md:w-16 max-w-full max-h-full"
                      alt="Apple Watch"
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
                          onClick={() => {
                            changeStatus(d._id, true);
                          }}
                          className="text-red-500"
                        >
                          <IoMdCloseCircle size={45} ml-3 />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      <div
                        className="text-red-500 w-12 h-12 mt-2 inline-block"
                        onClick={() => {
                          deleteHandler(d._id,d.image);
                        }}
                      >
                        <MdOutlineDeleteForever size={30} />
                      </div>
                      <div
                        className="text-blue-500 w-12 h-12 mt-2 inline-block"
                        onClick={() => {
                          editHandler(d);
                          setIsUpdate(true);
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
      {/* // table code end */}
    </>
  );
};

export default CategoryView;
