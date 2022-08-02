import { useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Form, Input, Wraaper, Button, H4, P, LoadButton } from "./styles";

import Loading from "../Loading";

import axios from "axios";

import decode from "jwt-decode";

import { AuthContext } from "../../context/auth";

import { ToastContainer, toast } from "react-toastify";

const SetNewPassword = () => {
  let [input, setInput] = useState({
    password: "",
  });

  let [loading, setLoading] = useState(false);

  let { token } = useParams();

  const { email } = decode(token);

  // Change Handler
  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let context = useContext(AuthContext);

  // Navigate
  let navigate = useNavigate();

  const notify = () => toast("Something Went Wrong!!");
  // Submit Handler
  const formHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (input.password) {
      axios
        .post("http://localhost:5000/recoverypassword", {
          email,
          password: input.password,
        })
        .then((data) => {
          context.login(token);
          setLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          notify();
        });
    }
  };

  return (
    <Wraaper>
      <ToastContainer />
      <Form onSubmit={formHandler}>
        <H4>Choose a new password</H4>
        <P>
          Create a new password that is at least 6 characters long. A strong
          password has a combination of letters, digits and punctuation marks.
        </P>
        <Input
          required
          type="password"
          placeholder="New Password"
          name="password"
          onChange={onChange}
        />
        {loading ? (
          <LoadButton>
            <Loading />
          </LoadButton>
        ) : (
          <Button type="submit">Continue</Button>
        )}
      </Form>
    </Wraaper>
  );
};

export default SetNewPassword;
