import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuItemsAsLogin = ({ logout, user }) => {
  return (
    <>
      <Menu.Item active key={user} name={user.username} />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          as={Link}
          to="/login"
          onClick={() => logout()}
        />
      </Menu.Menu>
    </>
  );
};

export default MenuItemsAsLogin;
