import React from 'react'
import HomeStyles from './Home.module.css'
import SidebarComponent from './sidebar/Sidebar.component'
import ContentComponent from './content/Content.component'

function HomeComponent() {
  return (
    <div className={HomeStyles['home-container']}>
      <div className={HomeStyles["sidebar"]}>
        <SidebarComponent/>
      </div>
      <div className={`${HomeStyles["content"]} ${HomeStyles["content-close"]}`}>
        <ContentComponent/>
      </div>
    </div>
  )
}

export default HomeComponent
