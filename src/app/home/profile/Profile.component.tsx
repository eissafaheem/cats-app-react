import React, {useEffect} from 'react'
import ProfileStyles from './Profile.module.css'
import { User } from '../../../client/models/Entities/User'
import { LocalKeys, LocalStorage } from '../../../client/models/classes/businessLogic/LocalStorage'
import { AVATARS } from '../../_shared/utils/constatnts'

type ProfileProps ={
    user: User
}

function ProfileComponent(props: ProfileProps) {

    let {user} = props; 
    
  return (
    <div className={ProfileStyles['profile-container']}>
        <div className={ProfileStyles["close-div"]}></div>
        <div className={ProfileStyles["modal"]}>
            <header>
                <img src={AVATARS[user.avatarId]} alt="user avatar" />
                <div className={ProfileStyles["details"]}>
                    <h1>{user.name}</h1>
                    <h3>{user.email}</h3>
                </div>
            </header>
        </div>
    </div>
  )
}

export default ProfileComponent
