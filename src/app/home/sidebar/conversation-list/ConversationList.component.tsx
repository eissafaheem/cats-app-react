import React from 'react'
import ConversationListStyles from './ConversationList.module.css'
import ConversationItemComponent from './conversation-item/ConversationItem.component'
import { AVATARS } from '../../../_shared/utils/constatnts'

type ConversationListProps = {
    setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ConversationListComponent(props: ConversationListProps) {

    const arr = [1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const {
        setIsChatOpen
    } = props;
    return (
        <div className={ConversationListStyles['conversation-list-container']}>

            {
                arr.map((value, index) => {
                    return <>
                        <ConversationItemComponent lastMessage='Hii how are you?' profileAvatar={AVATARS[index%6]} timeStamp="7:58" userName={index+""} setIsChatOpen={setIsChatOpen}/>
                    </>
                })
            }
        </div>
    )
}

export default ConversationListComponent
