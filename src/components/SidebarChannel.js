import React, { useState } from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { channelInfo, selectChannelId } from "../store/appSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import ConfirmModal from "./ConfirmModal";
import EditModal from "./EditModal";

const SidebarChannel = ({
  channelId,
  channelName,
  createdBy,
  handleIsSelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const loggeduUser = useSelector(selectUser);
  const selectedChannelID = useSelector(selectChannelId);
  const [isEditing, setIsEditing] = useState(false);
  const [inputField, setInputField] = useState("");

  const handleOpenEditModal = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

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

  const handleEditChannel = async () => {
    const editedChannelId = channelId;
    if (editedChannelId) {
      try {
        const channelRef = doc(db, "channels", editedChannelId);
        const channelSnapshot = await getDoc(channelRef);

        if (channelSnapshot.exists()) {
          const channelName = inputField;
          const createdBy = channelSnapshot.data().createdBy;

          await updateDoc(channelRef, {
            channelName: channelName,
            createdBy: createdBy,
          });

          console.log("Channel updated successfully");
        } else {
          console.log("Channel does not exist");
        }
      } catch (error) {
        console.error("Error updating channel: ", error);
      }
    }
  };

  return (
    <div
      className={`sidebarChannel ${
        selectedChannelID === channelId ? "selected" : ""
      }`}
      onClick={() => {
        dispatch(
          channelInfo({
            channelId: channelId,
            channelName: channelName,
          })
        );
        handleIsSelected();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebarChannel_container">
        <div className="siderbar_hash"># {channelName}</div>
        {loggeduUser.uid === createdBy && isHovered && (
          <div className="sidebar_icons">
            <div onClick={handleOpenEditModal}>
              <AiFillEdit className="msg_edit_icon" />
            </div>
            <div onClick={handleOpenModal}>
              <BsTrashFill className="msg_delete_icon" />
            </div>
          </div>
        )}
        {isModalOpen && (
          <ConfirmModal
            onClose={handleCloseModal}
            onConfirm={() => handleDeleteChannel(channelId)}
            channelId={channelId}
          />
        )}
        {isEditing && (
          <EditModal
            setInputField={setInputField}
            message={channelName}
            onClose={handleCloseEditModal}
            onConfirm={handleEditChannel}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarChannel;
