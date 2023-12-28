import HomeStyles from "./Home.module.css";
import { Outlet } from "react-router-dom";
import InputComponent from "../_shared/components/input/Input.component";
import ButtonComponent from "../_shared/components/button/Button.component";
import ConversationListComponent from "./conversation-list/ConversationList.component";
import NewConversationModalComponent from "./new-conversation-modal/NewConversationModal.component";
import brandLogo from "./../../assets/brand-logo.svg";
import addIcon from "./../../assets/add-icon.svg";
import searchIcon from "./../../assets/search-icon.svg";
import { useHomeHook } from "./Home.hook";
import ChatComponent from "./chat/Chat.component";
import { AVATARS } from "../_shared/utils/constatnts";
import ProfileComponent from "./profile/Profile.component";
import { useTypedSelector } from "../../redux/store";
import { useDispatch } from 'react-redux';
// import { decrement, increment } from "../../redux/slices/countSlice";
import { addConversation, removeConversation } from "../../redux/slices/conversationSlice";
import { Conversation } from "../../client/models/Entities/Conversation";
import { useCustomSelector } from "../../redux/slices/selector";

function HomeComponent() {
  const {
    setSearchString,
    openNewConversationModal,
    setSelectedConversation,
    // conversations,
    isNewConversationModalVisible,
    setIsNewConversationModalVisible,
    // setConversations,
    selectedConversation,
    userDetails,
    isProfileVisible,
    setIsProfileVisible,
    setUserDetails,
    onSearchStringCHange
  } = useHomeHook();
  const { getAllConversationState } = useCustomSelector();
  const dispatch = useDispatch();
  return (
    <div className={HomeStyles["home-container"]}>
      <div className={HomeStyles["sidebar"]}>
        <div className={HomeStyles["sidebar-container"]}>
          <div className={HomeStyles["header"]}>
            <div className={HomeStyles["brand-logo"]}>
              <img src={brandLogo} alt="Meow Logo" />
              <div className={HomeStyles["brand-name"]}>Meow</div>
              <button onClick={() => {
                dispatch(addConversation(new Conversation("7687")))
              }}>Inc</button>
              <button onClick={() => {
                dispatch(removeConversation(0))
              }}>Dec</button>
            </div>
            <div className={HomeStyles["my-profile"]} onClick={() => { setIsProfileVisible(!isProfileVisible) }}>
              <img src={AVATARS[userDetails.avatarId]} alt="Avatar" />
            </div>
          </div>
          <div className={HomeStyles["sidebar-options"]}>
            <div className={HomeStyles["input"]}>
              <InputComponent
                onChange={onSearchStringCHange}
                icon={searchIcon}
                placeholder="Search people"
              />
            </div>
            <div className={HomeStyles["button"]}>
              <ButtonComponent
                icon={addIcon}
                onClick={openNewConversationModal}
              />
            </div>
          </div>
          <ConversationListComponent
            setSelectedConversation={setSelectedConversation}
          />
          {/* {isNewConversationModalVisible && (
            <NewConversationModalComponent
              setIsNewConversationModalVisible={
                setIsNewConversationModalVisible
              }
              setConversations={setConversations}
              conversations={conversations}
            />
          )} */}

          {
            isProfileVisible &&
            <ProfileComponent user={userDetails} setIsProfileVisible={setIsProfileVisible} setUserDetails={setUserDetails} />
          }
        </div>
      </div>

      <div
        className={`${HomeStyles["content"]} ${selectedConversation?._id && HomeStyles["content-open"]
          }`}
      >
        {/* <ChatComponent
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          // allConversations={conversations}
          // setAllConversations={setConversations}
          myDetails={userDetails}
          setMyDetails={setUserDetails}
        /> */}
      </div>
    </div>
  );
}

export default HomeComponent;
