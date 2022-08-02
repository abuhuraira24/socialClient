import { useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Container, Content, Img, Link, Wrapper } from "./styles";

import email from "./email.png";

import axios from "axios";

import { AuthContext } from "../../context/auth";

import jwtDecode from "jwt-decode";

const ConfirmAccount = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const params = useParams();

  let user = jwtDecode(params.text);

  useEffect(() => {
    axios
      .post("http://localhost:5000/activeUser", { email: user.email })
      .then((data) => {
        context.login(data.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.status);
        navigate("/notfound");
      });
    // navigate("/");
  });

  return (
    <Wrapper>
      <Container>
        <Img src={email} alt="emai" />
        <h1>Congratulations {user.firstName} </h1>
      </Container>
      <Content>
        <Button>Active Account</Button>
      </Content>
    </Wrapper>
  );
};

export default ConfirmAccount;
