import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CATEGORY_BASE_URL = process.env.REACT_APP_CATEGORY_BASE_URL;
const COLOR_BASE_URL = process.env.REACT_APP_COLOR_BASE_URL;
const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;

const MainContext = createContext();

const Context = (props) => {
  const [category, setCategory] = useState([]);
  const [color,setColor] = useState([])
  const [product,setProduct] = useState([])
  const [categoryImageUrl,setCategoryImageUrl] = useState('')
  const [productImageUrl,setProductImageUrl] =useState('')
  const [catFilterProduct,setCatFilterProduct] = useState([])
  const [loader,setLoader] = useState(false)
  const [isHome,setisHome] = useState(false)
  let [bestSellor, setBestSellor] = useState([]);

  

  // filter product base on category
  const [cat,setCat] = useState(0)
  // console.log(cat)

  // filter product logic category base
  useEffect(
    ()=>{
     if(cat != 0){
      const newBestSellor = bestSellor.filter(
        (prod)=>{
          // console.log(prod)
          return prod.category == cat
        }
      )
      setCatFilterProduct(newBestSellor)
     }
    },[cat]
  )

  // console.log(catFilterProduct)

  // get category
  const fetchCategory = () => {
    axios
      .get(API_BASE_URL+CATEGORY_BASE_URL + "/read")
      .then((success) => {
        setCategory(success.data.data);
        setCategoryImageUrl(success.data.imageBaseUrl)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get color
  const fetchColor = () => {
    axios.get(API_BASE_URL+COLOR_BASE_URL+"/get-color").then(
      (success)=>{
        setColor(success.data.data)
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
  }

  // get product
  const fetchProduct = (limit=0,color_id=null,category_slug=null) =>{

    const queryUrl = new URLSearchParams({limit,color_id,category_slug})
    // console.log(queryUrl.toString())

    axios.get(API_BASE_URL+PRODUCT_BASE_URL+`?${queryUrl.toString()}`).then(
      (success)=>{
        setProduct(success.data.product)
        setProductImageUrl(success.data.imageBaseUrl)
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
  }

  // first render
  useEffect(() => {
    fetchCategory();
    fetchColor();
    // fetchProduct();
    fetchBestSellor()
  }, []);

  // openToast
  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };
  

  // get bestSellor
  const fetchBestSellor = () => {
    axios.get("http://localhost:5000/product/best-sellor").then((success) => {
      setBestSellor(success.data.bestSellor);
      setProductImageUrl(success.data.imageBaseUrl)
    });
  };


  return (
    <MainContext.Provider value={{ openToast,fetchBestSellor,categoryImageUrl,setisHome,isHome,bestSellor, category,color,COLOR_BASE_URL,fetchColor, fetchCategory,API_BASE_URL,CATEGORY_BASE_URL,PRODUCT_BASE_URL,product,productImageUrl,fetchProduct,setCat,cat,loader,setLoader,catFilterProduct}}>
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
