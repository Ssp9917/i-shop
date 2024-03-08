import React, { useContext, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MainContext } from "../../../Context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ColorView = () => {
 
const navigator = useNavigate()

  const {
    openToast,
    color,
    fetchColor,
    COLOR_BASE_URL,
    API_BASE_URL,
  } = useContext(MainContext);

 

  const deleteColor = (colorId) => {
    console.log(colorId);
    axios
      .delete(API_BASE_URL + COLOR_BASE_URL + "/delete/" + colorId)
      .then((success) => {
        openToast(success.data.msg, "success");
        fetchColor();
      })
      .catch((err) => {
        openToast(err.data.msg, "err");
      });
  };

  const changeStatus = (id, new_status) => {
   axios.put(API_BASE_URL+COLOR_BASE_URL+'/change-status/'+id+'/'+new_status).then(
    (success)=>{
      if(success.data.status){
        openToast(success.data.msg,"success")
        fetchColor()
      }else{
        openToast(success.data.msg,"error")
      }
    }
   ).catch(
    (err)=>{
      console.log(err)
      openToast(err.message)
    }
   )
  }
  
  return (
    <>

      {/* add color button code */}
      <div className="w-full flex justify-end mt-5">
        <Link to='/admin/color/add'>
        <button
          type="button"
          className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        
        >
          <div className="flex gap-2 items-center">
            Add Color <FaCartPlus size={20} />
          </div>
        </button>
        </Link>
      </div>

      {/* List code */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SR
              </th>
              <th scope="col" className="px-6 py-3">
                Color name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
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
            {color.map((d, i) => {
               
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                  <td className="px-6 py-4">{i + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {d.name}
                  </th>
                  <td className="px-6 py-4">
                    <div
                      className="w-10 h-10 rounded-[50%]"
                      style={{ backgroundColor: `${d.slug}` }}
                    ></div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      {d.status == true ? (
                        <div className="text-green-500" onClick={()=>{changeStatus(d._id,false)}}>
                          <FaCheckCircle size={45} ml-3 />
                        </div>
                      ) : (
                        <div className="text-red-500" onClick={()=>{changeStatus(d._id,true)}}>
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
                          deleteColor(d._id);
                        }}
                      >
                        <MdOutlineDeleteForever size={30} />
                      </div>
                      <div
                        className="text-blue-500 w-12 h-12 mt-2 inline-block"
                        onClick={() => {
                         navigator('/admin/color/edit/'+d._id)
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
    </>
  );
};

export default ColorView;
