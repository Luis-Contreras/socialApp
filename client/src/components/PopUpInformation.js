import React from "react";
import { Popup } from "semantic-ui-react";

const PopUpInformation = ({ content, label }) => {
  return <Popup content={label} inverted trigger={content} />;
};

export default PopUpInformation;
