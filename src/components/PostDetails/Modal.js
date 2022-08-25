import { useNavigate, useParams } from "react-router-dom";

import { HashLink } from "react-router-hash-link";

import { Body, Close, CloseModal, Wrapper } from "./modalStyle";

const Modal = ({ children }) => {
  const { postId } = useParams();

  return (
    <Wrapper>
      <Body>
        <CloseModal>
          <Close>
            <HashLink to={`/#${postId}`}>
              <i class="fa-solid fa-ban"></i>
            </HashLink>
          </Close>
        </CloseModal>
        {children}
      </Body>
    </Wrapper>
  );
};

export default Modal;
