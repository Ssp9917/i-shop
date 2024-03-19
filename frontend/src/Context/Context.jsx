import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CATEGORY_BASE_URL = process.env.REACT_APP_CATEGORY_BASE_URL;
const COLOR_BASE_URL = process.env.REACT_APP_COLOR_BASE_URL;
const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;
const USER_BASE_URL = process.env.REACT_APP_USER_BASE_URL;
const CART_BASE_URL = process.env.REACT_APP_CART_BASE_URL;
const ORDER_BASE_URL = process.env.REACT_APP_ORDER_BASE_URL
const MainContext = createContext();

const Context = (props) => {
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [product, setProduct] = useState([]);
  const [categoryImageUrl, setCategoryImageUrl] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [catFilterProduct, setCatFilterProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isHome, setisHome] = useState(false);
  let [bestSellor, setBestSellor] = useState([]);
  // pasination functionality
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);



  // filter product base on category
  const [cat, setCat] = useState(0);
  // console.log(cat)


  const prevHandler = () => {
    setPage(
      ()=>{
        if(page == 1) return page
        return page - 1
      }
    )
  }

  const nextHandler = () => {
    setPage(
      ()=>{
        if(page == pageCount) return page
        return page + 1
      }
    )
  }

  // filter product logic category base
  useEffect(() => {
    if (cat != 0) {
      const newBestSellor = bestSellor.filter((prod) => {
        // console.log(prod)
        return prod.category == cat;
      });
      setCatFilterProduct(newBestSellor);
    }
  }, [cat]);

  // console.log(catFilterProduct)

  // get category
  const fetchCategory = () => {
    axios
      .get(API_BASE_URL + CATEGORY_BASE_URL + "/read")
      .then((success) => {
        setCategory(success.data.data);
        setCategoryImageUrl(success.data.imageBaseUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get color
  const fetchColor = () => {
    axios
      .get(API_BASE_URL + COLOR_BASE_URL + "/get-color")
      .then((success) => {
        setColor(success.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get product
  const fetchProduct = (
    limit = 0,
    color_id = null,
    category_slug = null,
    sort,
    page,
    minPrice,
    maxPrice
  ) => {
    // console.log("sort",sort_id)

    const queryUrl = new URLSearchParams({
      limit,
      color_id,
      category_slug,
      sort,
      page,
      minPrice,
      maxPrice
    });
    // console.log(queryUrl.toString())

    axios
      .get(API_BASE_URL + PRODUCT_BASE_URL + `?${queryUrl.toString()}`)
      .then((success) => {
        setProduct(success.data.product);
        setProductImageUrl(success.data.imageBaseUrl);
        setPageCount(success.data.pagination.pageCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // first render
  useEffect(() => {
    fetchCategory();
    fetchColor();
    // fetchUser();
    fetchBestSellor();
  }, []);

  // openToast
  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };

  // get bestSellor
  const fetchBestSellor = () => {
    axios.get("http://localhost:5000/product/best-sellor").then((success) => {
      setBestSellor(success.data.bestSellor);
      setProductImageUrl(success.data.imageBaseUrl);
      
    });
  };

  return (
    <MainContext.Provider
      value={{
        page,
        pageCount,
        openToast,
        fetchBestSellor,
        categoryImageUrl,
        setisHome,
        isHome,
        bestSellor,
        category,
        color,
        COLOR_BASE_URL,
        fetchColor,
        fetchCategory,
        API_BASE_URL,
        CATEGORY_BASE_URL,
        PRODUCT_BASE_URL,
        product,
        productImageUrl,
        fetchProduct,
        setCat,
        cat,
        loader,
        setLoader,
        catFilterProduct,
        USER_BASE_URL,
        CART_BASE_URL,
        prevHandler,
        nextHandler,
        ORDER_BASE_URL
      }}
    >
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
