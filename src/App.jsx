import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import SignUp from './Authentication/SignUp'
import Login from './Authentication/Login'
import Home from './components/Home/Home'
import User from './Pages/User/User';
const App = () => {

  const endpoints = createBrowserRouter([
    {
      path : '/',
      element: <> <Navbar/><Home/> </>
    },{
      path : "/signup",
      element : <SignUp/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/users',
      element : <> <Navbar/> <User/> </>
    }
  ])

  return (
    <div>
      <RouterProvider router={endpoints} ></RouterProvider>
    </div>
  )
}

export default App
