import React from 'react'
import ConversationListStyles from './ConversationList.module.css'
import ConversationItemComponent from './conversation-item/ConversationItem.component'
import { AVATARS } from '../../../utils/avatars'

function ConversationListComponent() {

    const arr = [1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <div className={ConversationListStyles['conversation-list-container']}>

            {
                arr.map((value, index) => {
                    return <>
                        <ConversationItemComponent lastMessage='Hii how are you?' profileAvatar={AVATARS[index%6]} timeStamp="7:58" userName='Liam Anderson' />
                    </>
                })
            }
        </div>
    )
}

export default ConversationListComponent
