import React from "react";
import { Button, Form } from "semantic-ui-react";
import Title from "../components/Title";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from "../graphql";
import ListFormErros from "../components/ListFormErrors";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallBack() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title label="Create a post:" />
        <Form.Field>
          <Form.Input
            placeholder="Hello"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      <ListFormErros error={error} />
    </>
  );
};

export default PostForm;
