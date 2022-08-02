import React from "react";

import Modal from "react-modal";
import { Buttons, Close, H4, Icon, Login } from "./Styles";
import { CreateButton } from "../Popup/Styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    borderRadius: "15px",
    transition: ".5s",
    transitionDelay: "2s",
  },
};

Modal.setAppElement("#root");
const Popup = ({ children }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>{children}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Close>
          <H4>Log in to continue</H4>
          <Icon onClick={closeModal} className="fa-solid fa-xmark"></Icon>
        </Close>
        <Buttons>
          <Login to="/login">Login</Login>
          <CreateButton to="/register">Create Account</CreateButton>
        </Buttons>
      </Modal>
    </div>
  );
};

export default Popup;
