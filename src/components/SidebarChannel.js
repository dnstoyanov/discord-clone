import React from "react";
import "./SidebarChannel.css";

const SidebarChannel = ({ id, channel }) => {
  return (
    <div className="sidebarChannel">
      <h4>
        <div className="siderbar_hash">#</div>
        <div>YouTube</div>
      </h4>
    </div>
  );
};

export default SidebarChannel;
