import {
  Form,
  Input,
  Wraaper,
  Button,
  H4,
  P,
  Success,
  SuccessIcon,
} from "./styles";

import { Link } from "react-router-dom";

const SuccessMail = () => {
  return (
    <Wraaper>
      <Success>
        <SuccessIcon
          color="#4BB543"
          className="fa-solid fa-circle-check"
        ></SuccessIcon>
        <H4 color="#4BB543">Email sent successfully</H4>
        <P>
          Please Check your{" "}
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            rel="noreferrer"
            target="_blank"
          >
            email
          </a>
        </P>
      </Success>
    </Wraaper>
  );
};

export default SuccessMail;
