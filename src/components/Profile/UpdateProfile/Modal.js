import { useTheme } from "styled-components";

import Modal from "react-modal";

import {
  Avatar,
  Close,
  Edit,
  H4,
  Header,
  Icon,
  Img,
  P,
  ProfilePicture,
  Title,
} from "./styles";

const UpdatedModale = ({ modalIsOpen, closeModal, avatar }) => {
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
    },
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalIsOpen}
        style={customStyles}
      >
        <Header>
          <H4>Edit profile</H4>
          <Close onClick={closeModal}>
            <Icon className="fa-solid fa-xmark"></Icon>
          </Close>
        </Header>
        <Title>
          <H4>Profile Picture</H4>
          <Edit>Edit</Edit>
        </Title>
        <ProfilePicture>
          <Avatar>
            <Img src={avatar} alt="user" />
          </Avatar>
        </ProfilePicture>

        {/* Bio Update */}
        <Title>
          <H4> Bio</H4>
          <Edit>Add</Edit>
        </Title>
        <P>Describe yourself...</P>
      </Modal>
    </div>
  );
};

export default UpdatedModale;
