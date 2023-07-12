import React from "react";
import "./Message.css";

const Message = ({ message, timestamp, user }) => {
  return (
    <div className="message">
      <div
        className="message_userProfilePicture"
        style={{ backgroundImage: `url(${user.photo})` }}
      />
      <div className="message_info">
        <h4>
          {user.displayName}
          <span className="message_time">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
