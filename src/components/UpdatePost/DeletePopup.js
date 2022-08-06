
import Modal from "react-modal";
import { useTheme } from "styled-components";

import { Close, H5, P } from "./PopupStyles";

const DeletePopup = ({ isOpen, closeModal, children, title, text }) => {
  const theme = useTheme();
  // Popup stye
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      border: "none",
      background: theme.gray,
      transform: "translate(-50%, -50%)",
      // width: "40%",
      borderRadius: "15px",
      transition: ".5s",
      transitionDelay: "2s",
      overflow: "inherit",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Close onClick={closeModal}>
        <H5>{title}</H5>
        <i className="fa-solid fa-xmark"></i>
      </Close>
      <P>{text}</P>
      {children}
    </Modal>
  );
};

export default DeletePopup;
