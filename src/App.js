import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <ChatSection />
      </header>
    </div>
  );
}

export default App;
