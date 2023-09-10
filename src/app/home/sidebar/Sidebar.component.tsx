import React, { useState } from 'react'
import SidebarStyles from './Sidebar.module.css'
import brandLogo from './../../../assets/brand-logo.svg'
import InputComponent from '../../_shared/components/input/Input.component'
import searchIcon from './../../../assets/search-icon.svg'
import addIcon from './../../../assets/add-icon.svg'
import ButtonComponent from '../../_shared/components/button/Button.component'
import ConversationListComponent from './conversation-list/ConversationList.component'

function SidebarComponent() {

  const [searchString, setSearchString] = useState<string>("")

  function handleAddButtonClick() {

  }

  return (
    <div className={SidebarStyles['sidebar-container']}>
      <div className={SidebarStyles["header"]}>
        <div className={SidebarStyles["brand-logo"]}>
          <img src={brandLogo} alt="Cat's App Logo" />
        </div>
        <div className={SidebarStyles["brand-name"]}>
          Cat's App
        </div>
      </div>
      <div className={SidebarStyles["sidebar-options"]}>
        <div className={SidebarStyles["input"]}>
          <InputComponent setValue={setSearchString} icon={searchIcon} placeholder='Search people' />
        </div>
        <div className={SidebarStyles["button"]}>
          <ButtonComponent icon={addIcon} onClick={handleAddButtonClick} />
        </div>
      </div>
      <ConversationListComponent/>
    </div>
  )
}

export default SidebarComponent
