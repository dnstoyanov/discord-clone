import React from "react";
import "./Login.css";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="logIn">
      <div className="login_logo">
        <img
          alt=""
          src="https://logowik.com/content/uploads/images/discord8706.jpg"
        />
      </div>
      <button onClick={signInWithGoogle}>Log In</button>
    </div>
  );
};

export default Login;
