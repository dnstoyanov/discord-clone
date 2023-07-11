import React from "react";
import "./Message.css";
import profilePic from "../assets/ffs.jpg";

const Message = () => {
  return (
    <div className="message">
      <div
        className="message_userProfilePicture"
        style={{ backgroundImage: `url(${profilePic})` }}
      />
      <div className="message_info">
        <h4>
          asdasdadda
          <span className="message_time">Send Time</span>
        </h4>
        <p>Here is the message</p>
      </div>
    </div>
  );
};

export default Message;
