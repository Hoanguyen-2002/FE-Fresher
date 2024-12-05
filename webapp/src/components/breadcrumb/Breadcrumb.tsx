import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const CommonBreadcrumb: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  interface BreadcrumbItem {
    path?: string;
    title: ReactNode;
    className?: string;
  }

  type BreadcrumbMap = {
    [key: string]: BreadcrumbItem[];
  };

  const homeBreadcrumb: BreadcrumbItem = {
    path: "/",
    title: (
      <>
        <HomeOutlined className="!text-[18px]" />
      </>
    ),
  };
  const createBreadcrumb = (
    path: string,
    title: ReactNode
  ): BreadcrumbItem[] => [
    homeBreadcrumb,
    { path, title, className: "!text-red" },
  ];

  const breadcrumbMap: BreadcrumbMap = {
    "/login": createBreadcrumb("/login", "Đăng nhập"),

    "/register": createBreadcrumb("/register", "Đăng ký"),

    "/OTPInput": createBreadcrumb("OTPInput", "Kích hoạt tài khoản"),

    "/forgotPass": createBreadcrumb("/forgotPass", "Quên mật khẩu"),

    "/resetPass": createBreadcrumb("/resetPass", "Đặt lại mật khẩu"),

    "/profile": createBreadcrumb("/profile", "Hồ sơ cá nhân"),

    "/cart": createBreadcrumb("/cart", "Giỏ hàng"),

    "/category": createBreadcrumb("/category", "Danh mục"),
    "/dieu-khoan-su-dung": createBreadcrumb(
      "/dieu-khoan-su-dung",
      "Điều khoản sử dụng"
    ),
    "/chinh-sach-bao-mat": createBreadcrumb(
      "/chinh-sach-bao-mat",
      "Chính sách bảo mật thông tin cá nhân"
    ),
    "/gioi-thieu": createBreadcrumb("/gioi-thieu", "Giới thiệu"),
    "/chinh-sach-doi-tra-hoan-tien": createBreadcrumb(
      "/chinh-sach-doi-tra-hoan-tien",
      "Chính sách đổi trả hoàn tiền"
    ),
    "/chinh-sach-bao-hanh": createBreadcrumb(
      "/chinh-sach-bao-hanh",
      "Chính sách bảo hành"
    ),
    "/chinh-sach-van-chuyen": createBreadcrumb(
      "/chinh-sach-van-chuyen",
      "Chính sách vận chuyển"
    ),
    "/books": createBreadcrumb("/books", "Sản Phẩm"),
  };

  const breadcrumbItems = currentPath.startsWith("/book/")
    ? breadcrumbMap["/book"]
    : breadcrumbMap[currentPath] || [];

    if (currentPath.startsWith("/book/")) return "";
    if (currentPath.endsWith("/")) return "";
  if (currentPath.startsWith("/orderTracking")) return "";
  if (currentPath.startsWith("/orderTracking/:id")) return "";
  // return <Breadcrumb className={"my-4"} items={breadcrumbItems}></Breadcrumb>;
  if (currentPath.startsWith("/cart/checkout/"))
    return (
      <Breadcrumb
        className={"mx-8 py-4 text-[16px] font-medium"}
        separator=">"
        items={[
          {
            title: (
              <>
                <HomeOutlined className="!text-[18px] hover:text-soft-red" />
              </>
            ),
            href: "/",
          },
          {
            title: "Giỏ hàng",
            href: "/cart",
            className: "hover:text-soft-red",
          },
          {
            title: "Xác nhận đặt hàng",
            className: "!text-red ",
          },
        ]}
      />
    );
  if (currentPath.startsWith("/review/"))
    return (
      <Breadcrumb
        className={"mx-8 py-4 text-[16px] font-medium"}
        separator=">"
        items={[
          {
            title: (
              <>
                <HomeOutlined className="!text-[18px] hover:text-soft-red" />
              </>
            ),
            href: "/",
          },
          {
            title: "Đơn hàng",
            href: "/profile/myOrders",
            className: "hover:text-soft-red",
          },
          {
            title: "Đánh giá",
            className: "!text-red ",
          },
        ]}
      />
    );
  return (
    <Breadcrumb className={"mx-8 py-4 text-[16px] font-medium"} separator=">">
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.path ? (
            <Link to={item.path} className={item.className}>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CommonBreadcrumb;
