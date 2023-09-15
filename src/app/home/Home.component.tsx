import React, { useState } from 'react'
import HomeStyles from './Home.module.css'
import SidebarComponent from './sidebar/Sidebar.component'
import ContentComponent from './content/Content.component'
import {Outlet} from 'react-router-dom'

function HomeComponent() {

    const [isChatOpen, setIsChatOpen]  = useState<boolean>(false)

  return (
    <div className={HomeStyles['home-container']}>
      <div className={HomeStyles["sidebar"]}>
        <SidebarComponent setIsChatOpen={setIsChatOpen}/>
      </div>
      <div className={`${HomeStyles["content"]} ${ isChatOpen && HomeStyles["content-open"]}`}>
        <Outlet/>
      </div>
    </div>
  )
}

export default HomeComponent
