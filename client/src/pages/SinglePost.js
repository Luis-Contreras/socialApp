import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from "../graphql";
import { Card, Grid, Image } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../templates/CommentForm";
import CommentButton from "../components/CommentButton";
import BackButton from "../components/BackButton";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const { getPost } = data ? data : {};

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deleteButtonCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="medium"
              src={`https://i.pravatar.cc/400?u=${id}`}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton commentCount={commentCount} />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleteButtonCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <CommentForm
                    commentInputRef={commentInputRef}
                    comment={comment}
                    setComment={setComment}
                    submitComment={submitComment}
                  />
                </Card.Content>
              </Card>
            )}
            {comments &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            <BackButton />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
