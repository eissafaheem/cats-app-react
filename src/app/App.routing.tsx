import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutComponent from './layout/Layout.component';
import HomeComponent from './home/Home.component';
import ContentComponent from './home/content/Content.component';
import AuthComponent from './auth/Auth.component';
import SigninComponent from './auth/signin/Signin.component';
import SignupComponent from './auth/Signup/Signup.component';

function AppRouting() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
        {
          path: "/",
          element: <AuthComponent/>,
          children:[
            {
              path: "/",
              element: <SigninComponent/>
            },
            {
              path: "signup",
              element: <SignupComponent/>
            }
            
          ]
        },
        {
          path: "/home",
          element: <HomeComponent />,
          children: [
            {
              path: "chat",
              element: <ContentComponent/>
            },
            {
              path: "",
              element: <>No Chat Selected</>
            }
          ]
        }
      ]
    }
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default AppRouting;
