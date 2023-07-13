import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ onClose, onConfirm }) => {
  const handleOkClick = () => {
    onConfirm();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="confirm_modal">
      <div className="confirm_modal_content">
        <div className="confirm_modal_header">
          Are you sure you want to delete this message?
        </div>
        <div className="confirm_modal_controls">
          <button className="confirm_modal_controls_ok" onClick={handleOkClick}>
            OK
          </button>
          <button
            className="confirm_modal_controls_cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
