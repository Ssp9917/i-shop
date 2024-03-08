import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { MainContext } from "../../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
const ProductEdit = () => {
  // useParems
  const { id } = useParams();
  const [editProduct, setEditProduct] = useState(null);

  // all ref
  const priceRef = useRef();
  const discountRef = useRef();
  const latest_priceRef = useRef();
  const nameRef = useRef();
  const slugRef = useRef();

  // select state
  const [prodCategory, setProdCategory] = useState(null);
  const [prodColor, setProdColor] = useState(null);

  // context
  const {
    fetchCategory,
    category,
    fetchColor,
    color,
    PRODUCT_BASE_URL,
    API_BASE_URL,
    openToast,
    fetchProduct,
    productImageUrl
  } = useContext(MainContext);

  // useNevigate
  const nevigator = useNavigate();

  // discount
  const discount = () => {
    const price = priceRef.current.value;
    const discount = discountRef.current.value;
    return price - price * (discount / 100);
  };

  // catToSlug
  const catToSlug = (title) => {
    const slug = title
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", " ")
      .trim();
    return slug;
  };

  // file drop related
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
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

  //findSingle Product details
  useEffect(() => {
    axios
      .get(API_BASE_URL + PRODUCT_BASE_URL + "/" + id)
      .then((success) => {
        // console.log(success)
        if (success.data.status == 1) {
          setEditProduct(success.data.product);
          console.log(editProduct)
        } else {
          // console.log(success)
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => {
        openToast(err.message, "error");
      });
  }, []);

  // find select details
  useEffect(()=>{
    if(editProduct != null || editProduct != undefined){
      setProdCategory({value:editProduct?.category._id,label:editProduct?.category.name})
      setProdColor(editProduct?.color.map(
        (color)=>{
          return(
            {
              value:color._id,
              label:color.name
            }
          )
        }
      ))
    }
  },[editProduct])

  // console.log(product)

  const prodEditHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("price", e.target.price.value);
    formData.append("discount", e.target.discount.value);
    formData.append("latest_price", e.target.latest_price.value);
    formData.append("image", file);
    formData.append("old_name", editProduct?.image);
    formData.append("category", prodCategory.value);

    const prodData = prodColor.map(color=>color.value)
    formData.append("color", JSON.stringify(prodData));

    axios.put(API_BASE_URL+PRODUCT_BASE_URL+'/update/'+id,formData).then(
      (success)=>{
        // console.log(success)
        openToast(success.data.msg)
        fetchProduct()
        nevigator('/admin/product')
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
  };

  return (
    <div>
      <form className="m-4" onSubmit={prodEditHandler}>
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
              value={editProduct?.name}
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              onChange={(e) => {
                setEditProduct({ ...editProduct, name: e.target.value,slug:catToSlug(e.target.value) });
                
              }}
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
              value={editProduct?.slug}
              onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })}
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
              value={editProduct?.price}
              onChange={(e) => {
                setEditProduct({ ...editProduct, price: e.target.value,latest_price:discount() });
              }}
              type="number"
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
              value={editProduct?.discount}
              onChange={(e) => {
                setEditProduct({ ...editProduct, discount: e.target.value,latest_price:discount() });
              }}
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
              value={editProduct?.latest_price}
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Category
            </label>
            <Select
              onChange={(options) => {
                setProdCategory(options);
              }}
              value={prodCategory}
              
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
              onChange={(options) => {
                setProdColor(options);
              }}
              value={prodColor}
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
            <FileUploader handleChange={handleChange} name="file" defaultValue={editProduct?.image} />
            <span>{file?.name}</span>
            <img src={API_BASE_URL+productImageUrl+editProduct?.image} alt="" />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
