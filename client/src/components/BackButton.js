import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const BackButton = () => {
  return (
    <Button as={Link} to={"/"} color="teal" style={{ float: "right" }}>
      Back to home
    </Button>
  );
};

export default BackButton;
