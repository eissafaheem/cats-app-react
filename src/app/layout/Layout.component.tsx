import React from 'react'
import HomeComponent from '../home/Home.component'
import {Outlet} from 'react-router-dom'

function LayoutComponent() {
  return (
   <Outlet/>
  )
}

export default LayoutComponent
