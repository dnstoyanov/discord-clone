import React from "react";
import "./Message.css";

const Message = ({ messageKey, message, timestamp, user }) => {
  console.log(message);
  const timeStamp = timestamp?.toDate();
  return (
    <div className="message" id={messageKey}>
      <div
        className="message_userProfilePicture"
        style={{ backgroundImage: `url(${user.photo})` }}
      />
      <div className="message_info">
        <h4>
          {user.displayName}
          {timeStamp && (
            <span className="message_time">{timeStamp.toUTCString()}</span>
          )}
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
