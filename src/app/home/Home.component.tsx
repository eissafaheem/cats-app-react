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

function HomeComponent() {
  const {
    setSearchString,
    openNewConversationModal,
    setSelectedConversation,
    conversations,
    isNewConversationModalVisible,
    setIsNewConversationModalVisible,
    setConversations,
    selectedConversation,
    userDetails,
    isProfileVisible,
    setIsProfileVisible,
    setUserDetails,
    onSearchStringCHange
  } = useHomeHook();

  return (
    <div className={HomeStyles["home-container"]}>
      <div className={HomeStyles["sidebar"]}>
        <div className={HomeStyles["sidebar-container"]}>
          <div className={HomeStyles["header"]}>
            <div className={HomeStyles["brand-logo"]}>
              <img src={brandLogo} alt="Cat's App Logo" />
              <div className={HomeStyles["brand-name"]}>Cat's App</div>
            </div>
            <div className={HomeStyles["my-profile"]} onClick={()=>{setIsProfileVisible(!isProfileVisible)}}>
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
            conversations={conversations}
            allConversations={conversations}
            setAllConversations={setConversations}
          />
          {isNewConversationModalVisible && (
            <NewConversationModalComponent
              setIsNewConversationModalVisible={
                setIsNewConversationModalVisible
              }
              setConversations={setConversations}
              conversations={conversations}
            />
          )}

          {
            isProfileVisible &&
            <ProfileComponent user={userDetails} setIsProfileVisible={setIsProfileVisible} setUserDetails={setUserDetails}/>
          }
        </div>
      </div>

      <div
        className={`${HomeStyles["content"]} ${selectedConversation?._id && HomeStyles["content-open"]
          }`}
      >
        <ChatComponent
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          allConversations={conversations}
          setAllConversations={setConversations}
          myDetails = {userDetails}
          setMyDetails={setUserDetails}
        />
      </div>
    </div>
  );
}

export default HomeComponent;
