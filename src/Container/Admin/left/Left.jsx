import React, { useState } from "react";


const Left = () => {

  const [togle,setTogle] = useState(true);
  

  const togleHandler=()=>{



    setTogle(!togle)
  }


  const menu = [
    {
      name: "Dashboard",
      url: "/",
      child:null
    },
    {
      name: "Category",
      url: "/category",
      child: [
        {
          name: "Add",
          url: "/category/add",
        },
        {
          name: "View",
          url: "/category/view",
        },
      ],
    },
    {
      name: "Color",
      url: "/color",
      child: [
        {
          name: "Add",
          url: "/category/add",
        },
        {
          name: "View",
          url: "/category/view",
        },
      ],
    },
    {
      name: "Product",
      url: "/color",
      child: [
        {
          name: "Add",
          url: "/category/add",
        },
        {
          name: "View",
          url: "/category/view",
        },
      ],
    },
  ];

  return (
    <>
      <div className="text-center text-white my-2">
        <h1>iShop</h1>
      </div>
      <hr className="bg-white"></hr>
      <ul className="list-unstyled text-white">
        {menu.map((item, index) => {
          console.log(item);
          return (
            <li className="my-2 mx-3 text-white" onClick={togleHandler}>
              {item.name}
              {item.child != null ? (
                <div className="bg-black rounded-md" >
                  <ul className=''>
                    {  item.child.map(
                    (c, index) => {
                      console.log(c.name)
                      return <li key={index} className={`ps-3 pt-1 pb-1  ${togle == true?"hidden":"block"}`}>{c.name}</li>;
                    }
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Left;
