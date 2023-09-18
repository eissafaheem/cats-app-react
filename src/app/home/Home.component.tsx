import React, { useEffect, useState } from "react";
import HomeStyles from "./Home.module.css";
import SidebarComponent from "./sidebar/Sidebar.component";
import ContentComponent from "./content/Content.component";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketIoService } from "../../client/services/socket-io.service";
import {
  LocalKeys,
  LocalStorage,
} from "../../client/models/classes/businessLogic/LocalStorage";
import { User } from "../../client/models/Entities/User";
import { SocketIoEvent } from "../../client/models/Entities/SocketIoEvents";

function HomeComponent() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const socketIoService = new SocketIoService();

  useEffect(() => {
    establishSocketioConnection();
    return () => {
      socketIoService.unregisterEvent(SocketIoEvent.JOIN_MY_ROOM, () => {});
      socketIoService.unregisterEvent(SocketIoEvent.JOINED, () => {});
    };
  }, []);

  function establishSocketioConnection() {
    const userDetails: User = new LocalStorage().getData(
      LocalKeys.USER_DETAILS
    );
    socketIoService.establishConnection(userDetails);
    socketIoService.emitEvent(SocketIoEvent.JOIN_MY_ROOM, userDetails);
    socketIoService.recieveEvent(SocketIoEvent.JOINED, (data) => {
      console.log("joined", data);
    });
    // socketIoService.recieveEvent(SocketIoEvent.RECIEVE_MESSAGE, (data)=>{
    //   console.log("event");
    //   console.log(data);
    // })
  }

  return (
    <div className={HomeStyles["home-container"]}>
      <div className={HomeStyles["sidebar"]}>
        <SidebarComponent setIsChatOpen={setIsChatOpen} />
      </div>
      <div
        className={`${HomeStyles["content"]} ${
          isChatOpen && HomeStyles["content-open"]
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default HomeComponent;
