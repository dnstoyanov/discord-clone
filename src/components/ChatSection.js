import React, { useEffect, useRef, useState } from "react";
import "./ChatSection.css";
import ChatHeader from "./ChatHeader";
import { MdAddCircle } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { FaFaceSmile } from "react-icons/fa6";
import Message from "./Message";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";

import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  doc,
  query,
} from "firebase/firestore";
import { selectChannelId, selectChannelName } from "../store/appSlice";
import { selectUser } from "../store/userSlice";
import EmojiPicker from "emoji-picker-react";

const ChatSection = () => {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const [inputField, setInputField] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!channelId) {
      return;
    }
    const messagesRef = collection(db, "channels", channelId, "messages");
    const unsubscribe = onSnapshot(
      query(messagesRef, orderBy("timestamp")),
      (snapshot) => {
        const fetchedMessages = [];
        snapshot.forEach((doc) => {
          const messageData = doc.data();
          fetchedMessages.push({
            id: doc.id,
            email: messageData.user.email,
            message: messageData.message,
            user: messageData.user,
            timestamp: messageData.timestamp?.toDate().toUTCString(),
          });
        });
        setMessages(fetchedMessages);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [channelId]);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, "channels", channelId, "messages"),
        {
          id: uuidv4(),
          timestamp: serverTimestamp(),
          message: inputField,
          user: user,
        }
      );
      console.log("Message added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding message: ", error);
    }
    setInputField("");
    scrollToBottom();
  };

  const handleEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setInputField((prevInputField) => prevInputField + emoji);
  };

  return (
    <div className="chatSection">
      <ChatHeader channelName={channelName} />

      <div className="chatSection_messages">
        {messages.map((message) => {
          if (!message.id) {
            return null;
          }
          return (
            <Message
              key={message.id}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
              email={message.email}
              id={message.id}
            />
          );
        })}
        <div ref={chatRef} />
      </div>
      <div className="chatSection_input">
        <MdAddCircle className="chatSection_inputIcon" />
        <form>
          <input
            value={inputField}
            disabled={!channelId}
            onChange={(event) => setInputField(event.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            className="chatSection_inputBtn"
            type="submit"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chatSection_inputIcons">
          <FaGift className="chatSection_inputIcon" />
          <HiGif className="chatSection_inputIcon" />
          <FaFaceSmile
            className="chatSection_inputIcon"
            onClick={handleOpenEmoji}
          />
        </div>
      </div>
      {emojiOpen && (
        <div className="emojiPickerDialog">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
          <button className="emojiPickerCloseBtn" onClick={handleCloseEmoji}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
