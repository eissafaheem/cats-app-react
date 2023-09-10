import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import SidebarComponent from './home/sidebar/Sidebar.component';
import ContentComponent from './home/content/Content.component';
import HomeComponent from './home/Home.component';

const socket = io("http://localhost:5000")
socket.on("connect", ()=>{
  console.log("connected");
})

function App() {
  return (
    <div className="App">
      <HomeComponent/>
    </div>
  );
}

export default App;
