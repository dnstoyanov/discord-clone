import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { MdHeadphones } from "react-icons/md";
import { BsFillMicFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import SidebarChannel from "./SidebarChannel";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { auth, db } from "../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { channelInfo } from "../store/appSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();

  const handleIsSelected = () => {
    setIsSelected(true);
  };

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

  useEffect(() => {
    if (channels.length > 0) {
      const firstChannel = channels[0];
      dispatch(
        channelInfo({
          channelId: firstChannel.id,
          channelName: firstChannel.channel.channelName,
        })
      );
      handleIsSelected();
    }
  }, [channels, dispatch]);

  const handleAddChannel = async () => {
    const channelName = prompt("Enter new channel");
    if (channelName) {
      try {
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
          createdBy: user.uid,
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
              isSelected={isSelected}
              handleIsSelected={handleIsSelected}
              key={id}
              channelId={id}
              channelName={channel.channelName}
              createdBy={channel.createdBy}
            />
          ))}
        </div>
      </div>

      <div className="sidebar_userProfile">
        <div className="sidebar_userProfile_container">
          <div
            className="sidebar_userProfilePicture"
            style={{ backgroundImage: `url(${user.photo})` }}
            onClick={() => auth.signOut()}
          ></div>
          <div className="sidebar_userProfileInfo">
            <h4>{user.displayName}</h4>
            <p>#{user.uid.substring(0, 5)}</p>
          </div>
        </div>

        <div className="sidebar_userProfileIcons">
          <BsFillMicFill className="sidebar_userProfileIcons_icon" />
          <MdHeadphones className="sidebar_userProfileIcons_icon" />
          <IoMdSettings className="sidebar_userProfileIcons_icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
