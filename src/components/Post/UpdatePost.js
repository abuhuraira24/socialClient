import { useEffect, useState } from "react";
import { Form, TextArea } from "./PopupStyles";

const PostUpdateForm = ({ post }) => {
  let [value, setValue] = useState("");

  useEffect(() => {
    setValue(post);
  }, [post]);

  const ChangeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <Form>
      <TextArea
        type="text"
        onChange={ChangeHandler}
        value={value}
        rows="4"
        cols="50"
        maxlength="200"
      />
    </Form>
  );
};

export default PostUpdateForm;
