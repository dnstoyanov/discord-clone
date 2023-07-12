import React from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { channelInfo } from "../store/appSlice";
const SidebarChannel = ({ id, channelName }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          channelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <h4>
        <div className="siderbar_hash">#</div>
        <div>{channelName}</div>
      </h4>
    </div>
  );
};

export default SidebarChannel;
