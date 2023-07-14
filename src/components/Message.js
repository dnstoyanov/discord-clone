import React, { useState } from "react";

import "./Message.css";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import { selectChannelId } from "../store/appSlice";
import { db } from "../firebase-config";
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import ConfirmModal from "./ConfirmModal";

const Message = ({ message, timestamp, user, id, email }) => {
  const loggeduUser = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageId = id;

  const handleOpenModal = () => {
    setIsHovered(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHovered(false);
    setIsModalOpen(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteMessage = async (event) => {
    try {
      const messageRef = doc(db, "channels", channelId, "messages", messageId);
      const messageSnapshot = await getDoc(messageRef);

      if (messageSnapshot.exists()) {
        await deleteDoc(messageRef);
        setIsHovered(false);
        console.log("Message deleted successfully!");
      } else {
        console.log("Message not found.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleEditMessage = async () => {
    const editedChannelId = channelId;
    if (editedChannelId) {
      try {
        const messageRef = doc(
          db,
          "channels",
          channelId,
          "messages",
          messageId
        );
        const messageSnapshot = await getDoc(messageRef);
        console.log("messageSnapshot", messageSnapshot);

        if (messageSnapshot.exists()) {
          const message = prompt("Enter updated message");

          await updateDoc(messageRef, {
            message: message,
          });

          console.log("Message updated successfully");
        } else {
          console.log("Message does not exist");
        }
      } catch (error) {
        console.error("Error updating message: ", error);
      }
    }
  };

  return (
    <div
      className="message"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="message_container">
        <div
          className="message_userProfilePicture"
          style={{ backgroundImage: `url(${user.photo})` }}
        />
        <div className="message_info">
          <h4>
            {user.displayName}
            {timestamp && <span className="message_time">{timestamp}</span>}
          </h4>
          <p>{message}</p>
        </div>
      </div>
      {loggeduUser.email === email && isHovered && (
        <div className="msg_icons">
          <div onClick={handleEditMessage}>
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
          onConfirm={handleDeleteMessage}
        />
      )}
    </div>
  );
};

export default Message;
