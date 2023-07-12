import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/ChatSection";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser, logout } from "./store/userSlice";
import Login from "./components/Login";
import { auth } from "./firebase-config";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <ChatSection />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
