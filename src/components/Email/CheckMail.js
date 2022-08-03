import {  Content, Wrapper } from "./styles";


const CheckMail = () => {
  return (
    <Wrapper>
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
