import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CATEGORY_BASE_URL = process.env.REACT_APP_CATEGORY_BASE_URL


const MainContext = createContext();

const Context = (props) => {
  const [data, setData] = useState([]);
  const [categoryImageUrl,setCategoryImageUrl] = useState('')

  // get data
  const fetchCategory = () => {
    axios
      .get(API_BASE_URL+CATEGORY_BASE_URL + "/read")
      .then((success) => {
        setData(success.data.data);
        setCategoryImageUrl(success.data.imageBaseUrl)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };

  return (
    <MainContext.Provider value={{ openToast,categoryImageUrl, data, fetchCategory,API_BASE_URL,CATEGORY_BASE_URL }}>
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
