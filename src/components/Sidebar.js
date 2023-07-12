import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdSignalCellularAlt, MdHeadphones } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import SidebarChannel from "./SidebarChannel";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, db } from "../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "channels"), (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const handleAddChannel = async () => {
    const channelName = prompt("Enter new channel");
    if (channelName) {
      try {
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
        });
        console.log("Channel added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding channel: ", error);
      }
    }
  };

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
          <PlusOutlined
            onClick={handleAddChannel}
            className="sidebar_addChannel"
          />
        </div>
        <div className="sidebar_channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
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
          style={{ backgroundImage: `url(${user.photo})` }}
          onClick={() => auth.signOut()}
        ></div>
        <div className="sidebar_userProfileInfo">
          <h4>{user.displayName}</h4>
          <p>#{user.uid.substring(0, 5)}</p>
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
