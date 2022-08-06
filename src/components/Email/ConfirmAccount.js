import { useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Container, Content, Wrapper } from "./styles";

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
      .post("https://myserver222.herokuapp.com/", {
        email: user.email,
      })
      .then((data) => {
        context.login(data.data.token);
        navigate("/");
      })
      .catch((error) => {
        navigate("/notfound");
      });
    navigate("/");
  });

  return (
    <Wrapper>
      <Container>
        <h1>Congratulations {user.firstName} </h1>
      </Container>
      <Content>
        <Button>Active Account</Button>
      </Content>
    </Wrapper>
  );
};

export default ConfirmAccount;
