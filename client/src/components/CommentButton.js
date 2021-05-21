import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import PopUpInformation from "./PopUpInformation";

const CommentButton = ({ commentCount, id }) => {
  return (
    <PopUpInformation
      label="comment post"
      content={
        <Button
          as={id ? Link : "div"}
          to={`/posts/${id}`}
          labelPosition="right">
          <Button basic color="blue">
            <Icon name={commentCount > 1 ? "comments" : "comment"} />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      }
    />
  );
};

export default CommentButton;
