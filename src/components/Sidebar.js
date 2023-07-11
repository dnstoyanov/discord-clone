import React from "react";
import "./Sidebar.css";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdSignalCellularAlt, MdHeadphones } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import SidebarChannel from "./SidebarChannel";
import profilePic from "../assets/ffs.jpg";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>Channel Name</h3>
        <DownOutlined />
      </div>
      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <DownOutlined />
            <h4 style={{ marginLeft: "5px" }}>Text Channels</h4>
          </div>
          <PlusOutlined className="sidebar_addChannel" />
        </div>
        <div className="sidebar_channelsList">
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
        </div>
      </div>

      <div className="sidebar_voice">
        <MdSignalCellularAlt className="sidebar_voiceIcon" />
        <div className="sidebar_voiceInfo">
          <h4>Voice Connected</h4>
          <p>Stream</p>
        </div>
        <div className="sidebar_voiceIcons">
          <FaPhoneAlt />
          <AiOutlineInfoCircle />
        </div>
      </div>

      <div className="sidebar_userProfile">
        <div
          className="sidebar_userProfilePicture"
          style={{ backgroundImage: `url(${profilePic})` }}
        ></div>
        <div className="sidebar_userProfileInfo">
          <h4>@asasdadas</h4>
          <p>#thisIsMyID</p>
        </div>
        <div className="sidebar_userProfileIcons">
          <BsFillMicFill />
          <MdHeadphones />
          <IoMdSettings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
