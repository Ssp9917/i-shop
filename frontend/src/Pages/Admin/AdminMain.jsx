import React from 'react'
import Left from '../../Container/Admin/left/Left'
import { Outlet } from 'react-router-dom'
import Header from '../../Container/Admin/right/Header'

const AdminMain = () => {
  return (
   
   <div className='grid grid-cols-9'>
    <Left/>
    <div className='col-span-7'>
      <Header/>
      <Outlet/>
    </div>
   </div>
  
  )
}

export default AdminMain