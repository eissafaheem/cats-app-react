import React from 'react'
import ConversationItemStyles from './ConversationItem.module.css'

type ConversationItemProps = {
    profileAvatar: string,
    userName: string,
    lastMessage: string,
    timeStamp: string
}

function ConversationItemComponent(props: ConversationItemProps) {

    const {
        profileAvatar,
        userName,
        lastMessage,
        timeStamp
    } = props;

    return (
        <div className={ConversationItemStyles['conversation-item-container']}>
                <div className={ConversationItemStyles["profile-pic"]}>
                    <img src={profileAvatar} alt="Avatar" />
                </div>
                <div className={ConversationItemStyles["user"]}>
                    <div className={ConversationItemStyles["line-1"]}>
                        <div className={ConversationItemStyles["user-name"]}>
                            {userName}
                        </div>
                        <div className={ConversationItemStyles["timestamp"]}>
                            {timeStamp}
                        </div>
                    </div>
                    <div className={ConversationItemStyles["line-2"]}>
                        <div className={ConversationItemStyles["last-message"]}>
                            {lastMessage}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ConversationItemComponent
