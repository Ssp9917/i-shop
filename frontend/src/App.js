import React, { useEffect } from 'react'
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
import { useDispatch } from 'react-redux'
import { lsToCart } from './reducers/cartSlice'
import Login from './Pages/Website/Login'
import SignUp from './Pages/Website/SignUp'
import { lsToLogin } from './reducers/userSlice'
import MyProfile from './Pages/Website/MyProfile'
import SingleProduct from './Pages/Website/SingleProduct'
import UserView from './Pages/Admin/users/UserView'
import Checkout from './Pages/Website/Checkout'
import ThankYouPage from './Pages/Website/ThankYouPage'


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
        },
        {
          path:"myProfile",
          element:<MyProfile/>
        },
        {
          path:"/:id",
          element:<SingleProduct/>
        },
        {
          path:"checkout",
          element:<Checkout/>
        },
        {
          path:'order-placed/:id',
          element:<ThankYouPage/>
        }
      ]},
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      }

    ,
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
        },
        {
          path:'user',
          element:<UserView/>
        }
      ]
    }
  ]
)

const App = () => {

  const dispatcher = useDispatch()

  useEffect(
    ()=>{
      dispatcher(lsToCart())
      dispatcher(lsToLogin())
    },[]
  )

  return (
   <RouterProvider router={routes} /> 
  )
}

export default App