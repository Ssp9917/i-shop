import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../../Context/Context";
import { MdModeEditOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

const UserView = () => {
  const [user, setUser] = useState([]);

  const { openToast, API_BASE_URL } = useContext(MainContext);

  const fetchUser = () => {
    axios
      .get(API_BASE_URL + "/user/get-user")
      .then((success) => {
        setUser(success.data.user);
      })
      .catch(() => {});
  };

  const changeStatus = () => {};

  const deleteUser = () => {};

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);
  return (
    <>
      {/* add color button code */}
      <div className="w-full flex justify-end mt-5">
        <Link to="/admin/color/add">
          <button
            type="button"
            className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            <div className="flex gap-2 items-center">Add User</div>
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
                Profile
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                E-mail
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
            {user.map((d, i) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={i}
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  ></th>
                  <td className="px-6 py-4">{d.name}</td>
                  <td className="px-6 py-4">{d.email}</td>

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
                    <div className="flex">
                      <div
                        className="text-red-500 w-12 h-12 mt-2 inline-block"
                        onClick={() => {
                          deleteUser(d._id);
                        }}
                      >
                        <MdOutlineDeleteForever size={30} />
                      </div>
                      <div
                        className="text-blue-500 w-12 h-12 mt-2 inline-block"
                        onClick={() => {
                          navigator("/admin/color/edit/" + d._id);
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

export default UserView;
