import React, { useContext } from "react";
import { MainContext } from "../../../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ColorAdd = () => {

    //* Context 
    const {
        openToast,
        fetchColor,
        COLOR_BASE_URL,
        API_BASE_URL,
      } = useContext(MainContext);

    //* Navigator
    const navigator = useNavigate()   

    const addColor = (e) => {
        e.preventDefault();
    
      
          const name = e.target.name.value;
          const slug = e.target.slug.value;
    
          if (name != "" && slug != "") {
            axios
              .post(API_BASE_URL + COLOR_BASE_URL + "/create", { name, slug })
              .then((success) => {
                openToast(success.data.msg, "success");
                fetchColor();
                navigator('/admin/color')
                e.target.reset();
              })
              .catch((err) => {
                console.log(err);
                openToast(err.data.msg, "error");
              });
          
        }
      };


  return (
    
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl ps-3 font-semibold">
           Add
          Color
        </h2>
      </div>
      <hr className="!border-t-2 mt-3" />

      {/* form started */}
      <form className="m-4" onSubmit={addColor}>
        <div className="mb-3">
         

          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Color Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            // onChange={catToSlug}
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
            Color Slug
          </label>
          <input
            type="color"
            id="slug"
            name="slug"
            className="p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
      {/* form ended */}
    </div>
  );
};

export default ColorAdd;
