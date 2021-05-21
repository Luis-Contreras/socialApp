import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from "../graphql";
import PopUpInformation from "./PopUpInformation";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        data.getPosts = data.getPosts.filter((x) => x.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <PopUpInformation
        label={commentId ? "Delete comment" : "Delete post"}
        content={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}>
            <Icon style={{ margin: 0 }} name="trash" />
          </Button>
        }
      />

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
