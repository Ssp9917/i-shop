import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../Container/Website/Header'
import Footer from '../../Container/Website/Footer'


const WebsiteMain = () => {
  return (
   <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default WebsiteMain