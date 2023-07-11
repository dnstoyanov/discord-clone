import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ChatSection />
    </div>
  );
}

export default App;
