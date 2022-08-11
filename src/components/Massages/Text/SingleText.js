import { useContext } from "react";

import {
  P,
  Receiver,
  Sender,
  Parricapant,
  Creator,
  Send,
  Get,
  Avatar,
  Img,
  Pa,
} from "./Styles";

import { AuthContext } from "../../../context/auth";

const SingleText = ({ text }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Parricapant>
        {text.sender === user.id && (
          <Sender align={user.id === text.sender}>
            <Send>
              {" "}
              <P color="#fff">{text.text}</P>
            </Send>
          </Sender>
        )}
      </Parricapant>
      <Creator>
        {text.sender !== user.id && text.text && (
          <Receiver>
            <Avatar>
              <Img
                src="https://res.cloudinary.com/dza2t1htw/image/upload/v1660142979/285283233_359965916232900_2354054775476849342_n_fu4qam.jpg"
                alt="user"
              />
            </Avatar>
            <Get>
              <Pa>{text.text}</Pa>
            </Get>
          </Receiver>
        )}
      </Creator>
    </>
  );
};

export default SingleText;
