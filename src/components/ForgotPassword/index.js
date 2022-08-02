import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Form, Input, Wraaper, Button, H4, P, LoadButton } from "./styles";

import axios from "axios";

import Loading from "../Loading";

import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  let [input, setInput] = useState({
    email: "",
  });

  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const notify = () => toast("User Not Found!");
  const formHandler = (e) => {
    e.preventDefault();
    if (input.email) {
      setLoading(true);
      axios
        .post("http://localhost:5000/forgotpassword", {
          email: input.email,
          subject: "Email Verification",
          url: "http://localhost:3000/recovery_password",
        })
        .then((res) => {
          setLoading(false);
          navigate("/successmail");
        })
        .catch((error) => {
          notify();
          setLoading(false);
        });
    }
  };

  return (
    <Wraaper>
      <Form onSubmit={formHandler}>
        <ToastContainer position="top-center" hideProgressBar={true} />
        <H4>Find Your Account</H4>
        <P>
          Please enter your email address or mobile number to search for your
          account.
        </P>
        <Input required type="email" name="email" onChange={onChange} />

        {loading ? (
          <LoadButton>
            <Loading />
          </LoadButton>
        ) : (
          <Button type="submit">Search</Button>
        )}
      </Form>
    </Wraaper>
  );
};

export default Forgot;
