import { message } from "antd";

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    message.success("ĐĂNG NHẬP THÀNH CÔNG");
    return true;
  } else return false;
};
