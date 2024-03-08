import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';

const ColorEdit = () => {

  const {id} = useParams()
  const [color,setColor] = useState(null)

  const navigator = useNavigate()

  useEffect(
    ()=>{
        if(id != undefined){
          // console.log(API_BASE_URL+COLOR_BASE_URL+'/get-color/'+id)
          axios.get(API_BASE_URL+COLOR_BASE_URL+'/get-color/'+id).then(
            (success)=>{
              // console.log(success)
              if(success.data.status == 1){
                setColor(success.data.data)
                
              }else{
                // console.log(success)
                openToast(success.data.msg,'error')
              }
            }
          ).catch(
            (err)=>{
              console.log(err)
            }
          )
        }
    },[id]
  )
  // console.log(color)

     //* Context 
     const {
        openToast,
        fetchColor,
        COLOR_BASE_URL,
        API_BASE_URL,
      } = useContext(MainContext);

    const editHandler = (e) => {
      e.preventDefault()

        const name = e.target.name.value
        const slug = e.target.slug.value
  
        axios.put(API_BASE_URL+COLOR_BASE_URL+'/update/'+ id,{name,slug}).then(
          (success)=>{
            openToast(success.data.msg)
            e.target.reset()
            fetchColor()
            navigator('/admin/color')
          }
        ).catch(
          (err)=>{
            // openToast(err.data.msg)
          }
        )
    }



  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl ps-3 font-semibold">
           Edit
          Color
        </h2>
      </div>
      <hr className="!border-t-2 mt-3" />

      {/* form started */}
      <form className="m-4" onSubmit={editHandler} >
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
            value={color?.name}
            onChange={(e)=>setColor({...color,name:e.target.value})}
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
            value={color?.slug}
            onChange={(e)=>setColor({...color,slug:e.target.value})}
            className="p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
      {/* form ended */}
    </div>
  )
}

export default ColorEdit