import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { MainContext } from "../../../Context/Context";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductAdd = () => {
  // all ref
  const priceRef = useRef();
  const discountRef = useRef();
  const latest_priceRef = useRef();
  const nameRef = useRef();
  const slugRef = useRef();

  // select state
  const [prodCategory,setProdCategory] = useState(null)
  const [prodColor,setProdColor] = useState(null)

  // context
  const { fetchCategory, category, fetchColor, color,PRODUCT_BASE_URL,API_BASE_URL,openToast,fetchProduct,productImageUrl,loader,setLoader} =
    useContext(MainContext);

  // useNevigate
  const nevigator = useNavigate()

  // useEffect
  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  // discount
  const discount = () => {
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    latest_priceRef.current.value = price - price * (discount / 100);
  };

  // catToSlug
  const catToSlug = () => {
    const slug = nameRef.current.value
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", " ")
      .trim();
    slugRef.current.value = slug;
  };

  // file drop related
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    // console.log(file)
    setFile(file);
  };

  // ***************** react select code start *************

  const categoryOptions = category.map((d, i) => {
    return {
      label: d.name,
      value: d._id,
    };
  });

  // for multiple select

  const colorOptions = color.map((d, i) => {
    return {
      label: d.name,
      value: d._id,
    };
  });
  

  //************ react select code end **********


  // product submit api
  const productSubmitHandler = (e) =>{
    e.preventDefault()
    setLoader(true)
    const formData = new FormData();
    formData.append("name",e.target.name.value);
    formData.append("slug",e.target.slug.value);
    formData.append("price",e.target.price.value);
    formData.append("discount",e.target.discount.value);
    formData.append("latest_price",e.target.latest_price.value);
    formData.append("image",file);
    formData.append("category",prodCategory);
    formData.append("color",JSON.stringify(prodColor));



    axios.post(API_BASE_URL+PRODUCT_BASE_URL+'/create',formData).then(
      (success)=>{
        openToast(success.data.msg)
        e.target.reset()
        fetchProduct()
        nevigator('/admin/product')
        setLoader(false)
      }
    ).catch(
      (err)=>{
        setLoader(false)
        openToast(err.message)
      }
    )
  }

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl ps-3 font-semibold">Add Product</h2>
      </div>
      <hr className="!border-t-2 mt-3" />

      {/* form started */}
      <form className="m-4" onSubmit={productSubmitHandler}>
        {/* first row */}
        <div className="mb-3 grid grid-cols-2 gap-5">
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
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

          <div>
            <label
              for="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Slug
            </label>
            <input
              type="text"
              ref={slugRef}
              readOnly
              id="slug"
              name="slug"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* second row */}
        <div className="mb-3 grid grid-cols-3 gap-5">
          <div>
            <label
              for="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="number"
              onChange={discount}
              id="price"
              name="price"
              ref={priceRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              for="discount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discount (%)
            </label>
            <input
              type="number"
              onChange={discount}
              ref={discountRef}
              id="discount"
              name="discount"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="latest_price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price After Discount
            </label>
            <input
              type=""
              readOnly
              ref={latest_priceRef}
              id="latest_price"
              name="latest_price"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        {/* third row */}
        <div className="mb-3 grid grid-cols-2 gap-5">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Category
            </label>
            <Select
              onChange={(options)=>{
                setProdCategory(options.value)
              }}
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="category"
              options={categoryOptions}
            />
          </div>

          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select color
            </label>
            <Select
              onChange={(options)=>{
                const d = options.map((option)=>option.value)
                setProdColor(d)
              }}
              closeMenuOnSelect={false}
              isMulti
              options={colorOptions}
             
            />
          </div>
        </div>

        {/* fourth row */}
        <div className="mb-3 grid grid-cols-2 gap-5">
          <div>
            <label
              for="slug"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Image
            </label>
            <FileUploader handleChange={handleChange} name="file"  />
            <span>{file?.name}</span>
            {/* <img src={API_BASE_URL+PRODUCT_BASE_URL+productImageUrl+file?.name} alt="" /> */}
          </div>
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

export default ProductAdd;
