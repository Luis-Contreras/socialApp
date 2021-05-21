import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MenuItems = ({ activeItem, action }) => {
  const menuItemsRigth = [
    {
      id: 1,
      name: "login",
      path: "login",
    },
    {
      id: 2,
      name: "register",
      path: "register",
    },
  ];

  const menuItemsLeft = [
    {
      id: 3,
      name: "home",
      path: "/",
    },
  ];
  return (
    <>
      {menuItemsLeft &&
        menuItemsLeft.map((item) => (
          <Menu.Item
            key={item.id}
            name={item.name}
            active={activeItem === item.name}
            onClick={action}
            as={Link}
            to={item.path}
          />
        ))}
      <Menu.Menu position="right">
        {menuItemsRigth &&
          menuItemsRigth.map((item) => (
            <>
              <Menu.Item
                key={item.id}
                name={item.name}
                active={activeItem === item.name}
                onClick={action}
                as={Link}
                to={item.path}
              />
            </>
          ))}
      </Menu.Menu>
    </>
  );
};

export default MenuItems;
