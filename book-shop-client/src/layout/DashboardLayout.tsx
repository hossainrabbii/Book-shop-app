import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/dashboard/profile",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "/dashboard/orders",
              icon: <VideoCameraOutlined />,
              label: "Orders",
            },
            {
              key: "/dashboard/books",
              icon: <VideoCameraOutlined />,
              label: "Books",
            },
            {
              key: "/dashboard/categories",
              icon: <VideoCameraOutlined />,
              label: "Categories",
            },
            {
              key: "/dashboard/users",
              icon: <VideoCameraOutlined />,
              label: "Users",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ddd",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* This is where child routes like /dashboard/users go */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
