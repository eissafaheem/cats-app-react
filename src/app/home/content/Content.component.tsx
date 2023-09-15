import React, { useEffect, useState } from 'react'
import { AVATARS } from '../../_shared/utils/constatnts'
import ContentStyles from './Content.module.css'
import InputComponent from '../../_shared/components/input/Input.component'
import ButtonComponent from '../../_shared/components/button/Button.component';
import sendIcon from './../../../assets/send-icon.svg'
import bg from './../../../assets/chat-bg2.avif'
import  {useLocation} from 'react-router-dom' 

function ContentComponent() {

  const [message, setMessage] = useState<string>("");
  const location = useLocation();
 
  const {
     userName,
     conversationId
  } = location.state

  function handleButtonClick(event: any) {
    event.preventDefault();
    console.log("ok");


  }
  return (
    <div className={ContentStyles['content-container']}>
      <div className={ContentStyles["header"]}>
        <div className={ContentStyles["profile-avatar"]}>
          <img src={AVATARS[0]} alt="" />
        </div>
        <div className={ContentStyles["user"]}>
          <div className={ContentStyles["name"]}>
            {userName} {conversationId}
          </div>
          <div className={ContentStyles["status"]}>
            Online
          </div>
        </div>
      </div>
      <div className={ContentStyles["message-container"]}>
      {/* <img src={bg} alt="Background" id={ContentStyles["bg-img"]} /> */}
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quos quis necessitatibus dolorem eveniet veniam maxime. Rerum quae inventore ea eum aliquid? Ipsam velit totam officia molestiae consectetur esse animi, quasi incidunt doloremque ducimus libero labore porro dicta. Rem rerum ipsum quis, repudiandae doloribus odio dolorum voluptatem, ipsam libero aperiam saepe iusto doloremque iste vitae exercitationem minus dolores? Incidunt excepturi omnis, eligendi recusandae quisquam quibusdam dolores praesentium mollitia harum fugit quod blanditiis magnam repellendus nihil vero ipsam eius provident. Totam a et eos suscipit ipsa saepe autem nisi praesentium, deserunt cumque commodi officia earum molestias recusandae quaerat nulla hic sit debitis consequatur fugiat ea ratione. Quasi, delectus! Reiciendis assumenda eaque tempore dignissimos dicta, pariatur veritatis doloremque totam? Voluptatum, quas ipsa quam placeat aliquid eum, culpa consequatur quibusdam ut reiciendis deleniti impedit dicta eveniet unde ad doloremque corrupti consequuntur illum iure omnis? Ipsa in tenetur pariatur assumenda incidunt nam reiciendis ducimus ut quas voluptas? Consequatur recusandae perferendis vero ullam magnam obcaecati ea. Quae fuga nisi ab aut consectetur doloribus et officia odio beatae? Suscipit reiciendis cupiditate a quidem assumenda tenetur inventore quaerat, harum aliquam dolorem dolores asperiores consequatur dolor laborum? Suscipit alias ab in cupiditate dolore dolor facere! Laboriosam, pariatur reprehenderit?
          </span>
        </div>
        <div className={ContentStyles["my-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, aperiam. Nisi nihil corporis fuga a, maiores minus, cumque hic voluptatem itaque perspiciatis, recusandae omnis quam molestiae est dolores quisquam atque dolore sequi. Quae quis dolor sunt ex ipsa, ducimus quidem vel, molestiae reiciendis labore quos quisquam architecto impedit nisi at!
          </span>
        </div>
        <div className={ContentStyles["other-message"]}>
          <span>
            Hii how are you?
          </span>
        </div>
      </div>
      <form className={ContentStyles["footer"]} onSubmit={handleButtonClick}>
        <div className={ContentStyles['input']}>
          <InputComponent placeholder='Type message...' setValue={setMessage} />
        </div>
        <div className={ContentStyles['button']}>
          <ButtonComponent icon={sendIcon} />
        </div>
      </form>
    </div>
  )
}

export default ContentComponent
