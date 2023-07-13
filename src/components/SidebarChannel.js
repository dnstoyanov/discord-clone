import React, { useState } from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { channelInfo } from "../store/appSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { BsTrashFill } from "react-icons/bs";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import ConfirmModal from "./ConfirmModal";

const SidebarChannel = ({ channelId, channelName, createdBy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const loggeduUser = useSelector(selectUser);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOpenModal = () => {
    setIsHovered(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHovered(false);
    setIsModalOpen(false);
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      const channelRef = doc(db, "channels", channelId);
      const channelSnapshot = await getDoc(channelRef);

      if (channelSnapshot.exists()) {
        await deleteDoc(channelRef);
        console.log("Channel deleted successfully!");
      } else {
        console.log("Channel not found.");
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          channelInfo({
            channelId: channelId,
            channelName: channelName,
          })
        )
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebarChannel_container">
        <div className="siderbar_hash"># {channelName}</div>
        {loggeduUser.uid === createdBy && isHovered && (
          <div onClick={handleOpenModal}>
            <BsTrashFill className="msg_delete_icon" />
          </div>
        )}
        {isModalOpen && (
          <ConfirmModal
            onClose={handleCloseModal}
            onConfirm={() => handleDeleteChannel(channelId)}
            channelId={channelId}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarChannel;
