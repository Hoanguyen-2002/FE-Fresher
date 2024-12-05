import React, { useEffect, useState } from "react";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";;;
// import Footer from "./components/footer/Footer";
import { Avatar, Layout, Menu, MenuProps } from "antd";
import {
  ContactsOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ShopFilled,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  backgroundColor: "var(--soft-red)",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "var(--soft-red)",
  minHeight: 100,
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(100%)",
  maxWidth: "calc(100%)",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "var(--grey)",
  backgroundColor: "white",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "var(--grey)",
  backgroundColor: "white",
};
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  // {
  //   key: 'dashboard',
  //   icon: <LineChartOutlined />,
  //   label: 'Thống kê',
  // },
  {
    key: "orderManage",
    icon: <ShopFilled />,
    label: "Quản lý đơn hàng",
    children: [
      {
        key: "orderList",
        icon: <ProfileOutlined />,
        label: "Danh sách đơn hàng",
      },
    ],
  },
  {
    key: "productManage",
    icon: <UserOutlined />,
    label: "Quản lý sản phẩm",
    children: [
      {
        key: "productList",
        icon: <ProfileOutlined />,
        label: "Danh sách sản phẩm",
      },
      {
        key: "createProduct",
        icon: <PlusCircleOutlined />,
        label: "Thêm mới sản phẩm",
      },
    ],
  },
  {
    key: "categoryManage",
    icon: <ShoppingOutlined />,
    label: "Quản lý danh mục",
    children: [
      {
        key: "categoryList",
        icon: <ProfileOutlined />,
        label: "Danh sách danh mục",
      },
      {
        key: "createCategory",
        icon: <PlusCircleOutlined />,
        label: "Thêm mới danh mục",
      },
    ],
  },
  {
    key: "customerManage",
    icon: <ContactsOutlined />,
    label: "Quản lý khách hàng",
    children: [
      {
        key: "customerList",
        icon: <ProfileOutlined />,
        label: "Danh sách khách hàng",
      },
    ],
  },
  // {
  //   key: 'saleManage',
  //   icon: <MoneyCollectOutlined />,
  //   label: 'Quản lý khuyến mãi',
  // },
];

interface LevelKeysProps {
  key: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const AdminLayout: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState([
    "orderManage",
    "orderList",
  ]);
  const [selectedKey, setSelectedKey] = useState<string>("orderList");
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const detail = pathSegments[pathSegments.length - 1];

  const navigate = useNavigate();

  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const onMenuSelect: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    navigate(`/admin/${e.key}`);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    setSelectedKey(detail);
    const openKeys: string[] = items
      .filter((item) => item.children)
      .flatMap((item) =>
        item.children?.some((child) => child.key === detail) ? item.key : []
      )
      .filter(Boolean) as string[];

    setStateOpenKeys(openKeys);
  }, [detail]);

  return (
    <Layout style={layoutStyle}>
      <div style={headerStyle}>
        <Header></Header>
      </div>
      <Layout>
        <Sider width="15%" style={siderStyle}>
          <div className="container">
            <div className="bg-[white] min-h-screen">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<UserOutlined />}
              />
              <Menu
                mode="inline"
                defaultSelectedKeys={["orderList"]}
                selectedKeys={[selectedKey]}
                onClick={onMenuSelect}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                items={items}
              />
            </div>
          </div>
        </Sider>
        <Content style={contentStyle}>
          <Outlet />
          {/* const renderContent = () => {
    switch (selectedKey) {
      case ('createProduct'):
        return <CreateProduct />;
      case ('productList'):
        return <ListProduct />;
      case ('categoryList'):
        return <ListCategory />;
      case ('customerList'):
        return <ListCustomer />;
        case ('orderList'):
          return <ListOrder />;
    }
  } */}
        </Content>
      </Layout>
      <div style={footerStyle}>
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default AdminLayout;
