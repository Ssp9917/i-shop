import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import WebsiteMain from './Pages/Website/WebsiteMain'
import Home from './Pages/Website/Home'
import Store from './Pages/Website/Store'
import Cart from './Pages/Website/Cart'
import AdminMain from './Pages/Admin/AdminMain'
import AdminHome from './Pages/Admin/AdminHome'
import CategoryView from './Pages/Admin/category/CategoryView'
import ColorView from './Pages/Admin/colors/ColorView'
import ProductView from './Pages/Admin/product/ProductView'
import ColorAdd from './Pages/Admin/colors/ColorAdd'
import ColorEdit from './Pages/Admin/colors/ColorEdit'
import ProductAdd from './Pages/Admin/product/ProductAdd'
import ProductEdit from './Pages/Admin/product/ProductEdit'


const routes = createBrowserRouter(
  [
    {
      path:'/',
      element:<WebsiteMain/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"store/:category_slug?",
          element:<Store/>
        },
        {
          path:"cart",
          element:<Cart/>
        }
      ]
    },
    {
      path:'/admin',
      element:<AdminMain/>,
      children:[
        {
          path:'',
          element:<AdminHome/>
        },
        {
          path:'category',
          element:<CategoryView/>
        },
        {
          path:'color',
          element:<ColorView/>
        },
        {
          path:'product',
          element:<ProductView/>
        },
        {
          path:'color/add',
          element:<ColorAdd/>
        },
        {
          path:'color/edit/:id?',
          element:<ColorEdit/>
        },
        {
          path:'product/add',
          element:<ProductAdd/>
        },
        {
          path:'product/edit/:id?',
          element:<ProductEdit/>
        }
      ]
    }
  ]
)

const App = () => {
  return (
   <RouterProvider router={routes} />

   
  )
}

export default App