import React, { useState, useEffect } from "react";
import { HomeOutlined, LinkOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [currentMenu, setCurrentMenu] = useState("Home");
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const location = useLocation();

  useEffect(() => {
    setCurrentMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  });

  const handleClick = (e) => {
    setCurrentMenu(e.key);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[currentMenu]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/home" icon={<HomeOutlined />}>
        <NavLink to="/home">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="/link-submission" icon={<LinkOutlined />}>
        <NavLink to="/link-submission">Link Submission</NavLink>
      </Menu.Item>
      {token !== null ? (
        <Menu.Item key="/login" icon={<LockOutlined />}>
          <NavLink to="" onClick={handleLogout}>
            Logout
          </NavLink>
        </Menu.Item>
      ) : (
        <Menu.Item key="/login" icon={<LockOutlined />}>
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
      )}
      {token !== null ? (
        <Menu.Item key="/portal" icon={<LockOutlined />}>
          <NavLink to="/portal">Portal</NavLink>
        </Menu.Item>
      ) : (
        ""
      )}
    </Menu>
  );
};

export default Navbar;
