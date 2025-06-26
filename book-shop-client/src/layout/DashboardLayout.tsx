import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BiCategory } from "react-icons/bi";
import { TbBorderSides } from "react-icons/tb";
import { MdOutlineBook } from "react-icons/md";
import { LuBookUp2 } from "react-icons/lu";

import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const allItems = [
    {
      key: "/dashboard/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "/dashboard/orders",
      icon: <TbBorderSides />,
      label: "Orders",
    },
    {
      key: "/dashboard/books",
      icon: <MdOutlineBook />,
      label: "Books",
    },
    {
      key: "/dashboard/add-book",
      icon: <LuBookUp2 />,
      label: "Add Book",
    },
    {
      key: "/dashboard/categories",
      icon: <BiCategory />,
      label: "Categories",
    },
  ];
  const user = useAppSelector(selectCurrentUser);

  // Filter items based on role
  const visibleItems = user?.role === "admin" ? allItems : allItems.slice(0, 2);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="flex flex-col justify-between pt-5"
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={visibleItems}
        />

        <button
          className="bg-red-500 mx-auto text-white rounded p-2 ml-2 mt-12 cursor-pointer hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
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
            padding: 14,
            minHeight: 280,
            background: "#ddd",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
