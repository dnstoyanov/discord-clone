import React from "react";
import "./ChatHeader.css";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  BiSolidEditLocation,
  BiSearch,
  BiSolidHelpCircle,
} from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";

const ChatHeader = ({ channelName }) => {
  return (
    <div className="chatHeader_header">
      <div className="chatHeader_header_left">
        <h3>
          <div className="chatHeader_header_hash">#</div>
          {channelName}
        </h3>
      </div>

      <div className="chatHeader_header_right">
        <div className="chatHeader_header_right_icons">
          <IoNotificationsSharp className="chatHeader_header_right_icon" />
          <BiSolidEditLocation className="chatHeader_header_right_icon" />
          <BsPeopleFill className="chatHeader_header_right_icon" />
        </div>

        <div className="chatHeader_header_search">
          <input placeholder="Search" />
          <BiSearch />
        </div>
        <div>
          <IoMdSend className="chatHeader_header_right_icon" />
          <BiSolidHelpCircle className="chatHeader_header_right_icon" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
