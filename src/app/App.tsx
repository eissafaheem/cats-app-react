import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import SidebarComponent from './home/sidebar/Sidebar.component';
import ContentComponent from './home/content/Content.component';
import HomeComponent from './home/Home.component';
import AppRouting from './App.routing';

function App() {
  return (
    <div className="App">
      <AppRouting/>
    </div>
  );
}

export default App;
