import { Container, Content, Img, Link, Wrapper } from "./styles";

import email from "./email.png";

const CheckMail = () => {
  return (
    <Wrapper>
      <Container>
        <Img src={email} alt="emai" />
      </Container>
      <Content>
        Please Check Email to confirm your account!
        <a href="https://mail.google.com/mail/u/0/#inbox" target="_blanck">
          Go to Email
        </a>
      </Content>
    </Wrapper>
  );
};

export default CheckMail;
