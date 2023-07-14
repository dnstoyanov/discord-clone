import "./EditModal.css";

const EditModal = ({
  onClose,
  onConfirm,
  setInputField,
  message,
  messageId,
}) => {
  const handleOkClick = () => {
    onConfirm();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="edit_modal">
      <div className="edit_modal_content">
        {messageId ? (
          <div className="edit_modal_header">Edit your message</div>
        ) : (
          <div className="edit_modal_header">Edit your channel</div>
        )}
        <input
          className="edit_modal_input"
          defaultValue={message}
          onChange={(event) => setInputField(event.target.value)}
          placeholder={message}
        />
        <div className="edit_modal_controls">
          <button className="edit_modal_controls_ok" onClick={handleOkClick}>
            OK
          </button>
          <button
            className="edit_modal_controls_cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
