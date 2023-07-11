import React from "react";
import "./ChatSection.css";
import ChatHeader from "./ChatHeader";
import { MdAddCircle } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { FaFaceSmile } from "react-icons/fa6";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelName } from "../features/appSlice";

const ChatSection = () => {
  const channelName = useSelector(selectChannelName);

  return (
    <div className="chatSection">
      <ChatHeader channelName={channelName} />

      <div className="chatSection_messages">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="chatSection_input">
        <MdAddCircle className="chatSection_inputIcon" />
        <form>
          <input placeholder={`Message #TESTCHANNEL`} />
          <button className="chatSection_inputBtn" type="submit">
            Send Message
          </button>
        </form>

        <div className="chatSection_inputIcons">
          <FaGift className="chatSection_inputIcon" />
          <HiGif className="chatSection_inputIcon" />
          <FaFaceSmile className="chatSection_inputIcon" />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
