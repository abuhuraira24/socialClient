import Modal from "react-modal";
import { Wrapper, Header, Close, H5 } from "./Styles";
import UploadForm from "./UploadForm";
import { useTheme } from "styled-components";

const AvatarChangeModal = ({
  openAvatarChangerModal,
  closeModal,
  openModal,
}) => {
  const theme = useTheme();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: theme.gray,
      border: "none",
      width: "700px",
      padding: "1rem",
    },
  };
  return (
    <Wrapper>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Header>
          <H5>Update profile picture</H5>
          <Close onClick={closeModal}>
            <i class="fa-solid fa-xmark"></i>
          </Close>
        </Header>
        {/* <button onClick={closeModal}>close</button> */}
        <UploadForm closeModal={closeModal} />
      </Modal>
    </Wrapper>
  );
};

export default AvatarChangeModal;
