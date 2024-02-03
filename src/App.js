import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Main from './Pages/Website/Main'
import Home from './Pages/Website/Home'
import Store from './Pages/Website/Store'
import Cart from './Pages/Website/Cart'
import Dashboard from './Pages/Admin/Dashboard'


const routes = createBrowserRouter(
  [
    {
      path:'/',
      element:<Main/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/store",
          element:<Store/>
        },
        {
          path:"/cart",
          element:<Cart/>
        }
      ]
    },
    {
      path:'/admin',
      element:<Dashboard/>
    }
  ]
)

const App = () => {
  return (
   <RouterProvider router={routes} />

   
  )
}

export default App