import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutComponent from './layout/Layout.component';
import HomeComponent from './home/Home.component';
import ChatComponent from './home/chat/Chat.component';
import AuthComponent from './auth/Auth.component';
import SigninComponent from './auth/signin/Signin';
import SignupComponent from './auth/signup/Signup';
import NewConversationModalComponent from './home/new-conversation-modal/NewConversationModal.component';
import ProfileComponent from './home/profile/Profile.component';

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
          children:[
            {
              path: "chat",
              element: <ChatComponent/>
            },
            {
              path: "new-conversation",
              element: <NewConversationModalComponent/>
            },
            {
              path: "profile",
              element: <ProfileComponent/>
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
