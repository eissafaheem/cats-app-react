import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutComponent from './layout/Layout.component';
import HomeComponent from './home/Home.component';
import ContentComponent from './home/content/Content.component';

function AppRouting() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
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
