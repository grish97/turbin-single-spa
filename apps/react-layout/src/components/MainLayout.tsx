import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import React from "react";

const { Header } = Layout;

const items = [
  { label: <Link to="/dashboard">Dashboard</Link>, key: "/dashboard" },
  { label: <Link to="/career">Career</Link>, key: "/career" },
  { label: <Link to="/messenger">Messenger</Link>, key: "messenger" }
];

export const MainLayout: React.FC = () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" items={items} />
    </Header>
  </Layout>
);
