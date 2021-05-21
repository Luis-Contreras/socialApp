import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import PopUpInformation from "./PopUpInformation";
import CommentButton from "./CommentButton";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { id, body, createAt, username, likeCount, commentCount, likes } = post;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={`https://i.pravatar.cc/400?u=${id}`}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <CommentButton commentCount={commentCount} id={id} />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
