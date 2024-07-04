import React from "react";
import { Avatar, Menu, Button } from "@mantine/core";
// import { Menu, Button, Text, rem } from "@mantine/core";
import { IconHeart, IconHomeRibbon, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  // console.log(user);
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate("./favourites", { replace: true })}
          icon={<IconHeart />}
        >
          Favourites
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("./bookings", { replace: true })}
          icon={<IconHomeRibbon />}
        >
          Bookings
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout />}
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
