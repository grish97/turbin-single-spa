import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import {SettingOutlined, MessageOutlined} from '@ant-design/icons';
import {useAuth} from "@turbo/services";
import React from "react";

const {Header} = Layout;

export const MainLayout: React.FC = () => {
  const {logout, authState} = useAuth();

  const onLogout = () => {
    logout();
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" items={[
          {label: <Link to="/dashboard">Dashboard</Link>, key: "/dashboard"},
          {label: <Link to="/career">Career</Link>, key: "/career"},
          {label: <Link to="/messenger">Messenger</Link>, key: "messenger", icon: <MessageOutlined /> },
          {
            label: "Settings", icon: <SettingOutlined/>, key: "settings", children: [
              {label: <Link to="/auth/signin">Auth Page</Link>, key: "auth"},
              {label: <Link to="/auth/signin" onClick={onLogout}>Logout</Link>, key: "logout"},
            ]
          }
        ]}/>
      </Header>
    </Layout>
  )
};
