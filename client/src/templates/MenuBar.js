import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import MenuItems from "../components/MenuItems";
import MenuItemsAsLogin from "../components/MenuItemsAsLogin";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const { logout, user } = useContext(AuthContext);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      {user ? (
        <MenuItemsAsLogin user={user} logout={logout} />
      ) : (
        <MenuItems activeItem={activeItem} action={handleItemClick} />
      )}
    </Menu>
  );
};

export default MenuBar;
