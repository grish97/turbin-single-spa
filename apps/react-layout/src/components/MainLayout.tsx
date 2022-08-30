import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useLogout } from "@turbo/services";

const { Header } = Layout;

const pages = ["dashboard", "career", "messenger"];

export const MainLayout: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const location = useLocation();
  const { logout } = useLogout();

  useEffect(() => {
    const page = location.pathname.split("/")[1];

    if (pages.includes(page)) {
      setSelectedPage(page);
    }
  }, []);

  const onLogout = () => {
    logout();
  };

  const onChangePage = (selected) => {
    setSelectedPage(selected.key);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          selectedKeys={[selectedPage]}
          mode="horizontal"
          items={[
            {
              label: <Link to="/dashboard">Dashboard</Link>,
              key: "dashboard",
              onClick: onChangePage,
            },
            {
              label: <Link to="/career">Career</Link>,
              key: "career",
              onClick: onChangePage,
            },
            {
              label: <Link to="/messenger">Messenger</Link>,
              key: "messenger",
              onClick: onChangePage,
            },
            {
              label: "Settings",
              key: "settings",
              children: [
                {
                  label: <Link to="/auth/signin">Auth Page</Link>,
                  key: "auth",
                },
                {
                  label: (
                    <Link to="/auth/signin" onClick={onLogout}>
                      Logout
                    </Link>
                  ),
                  key: "logout",
                },
              ],
            },
          ]}
        />
      </Header>
    </Layout>
  );
};
