import React from "react";
import { Form } from "semantic-ui-react";

const CommentForm = ({
  comment,
  setComment,
  submitComment,
  commentInputRef,
}) => {
  return (
    <Form>
      <div className="ui action input fluid">
        <input
          type="text"
          placeholder="Comment"
          name="comment"
          value={comment}
          ref={commentInputRef}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="ui button teal"
          disabled={comment.trim() === ""}
          onClick={() => submitComment()}>
          Submit
        </button>
      </div>
    </Form>
  );
};

export default CommentForm;
