import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"

const FooterContent = () => {
  const navigate = useNavigate();
  return (
    <Flex
      gap={32}
      className="flex-col md:flex-row bg-white rounded-2xl w-full xl:w-3/5 mx-auto px-8 py-4 my-4"
    >
      <Flex vertical className="lg:border-r-[1px] lg:border-r-grey w-1/3">
        <img
          className="w-full md:w-[220px] cursor-pointer"
          alt="logo"
          src={logo}
          onClick={() => navigate("/")}
        ></img>
      </Flex>
      <Flex gap={32} className="justify-evenly flex-col md:flex-row">
        <Flex vertical>
          <p className="font-bold text-xl">DỊCH VỤ</p>
          <ul>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/dieu-khoan-su-dung"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Điều khoản sử dụng
              </Link>
            </li>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/chinh-sach-bao-mat"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Chính sách bảo mật thông tin cá nhân
              </Link>
            </li>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/gioi-thieu"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Giới thiệu Fahasa
              </Link>
            </li>
          </ul>
        </Flex>
        <Flex vertical>
          <p className="font-bold text-xl">HỖ TRỢ</p>
          <ul>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/chinh-sach-doi-tra-hoan-tien"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Chính sách đổi trả hoàn tiền
              </Link>
            </li>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/chinh-sach-bao-hanh"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Chính sách bảo hành
              </Link>
            </li>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/chinh-sach-van-chuyen"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Chính sách vận chuyển
              </Link>
            </li>
            <li className="cursor-pointer hover:text-soft-red">
              <Link
                to="/orderTracking"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Tra cứu đơn hàng
              </Link>
            </li>
          </ul>
        </Flex>
        <Flex vertical>
          <p
            className="font-bold text-xl"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            TÀI KHOẢN CỦA TÔI
          </p>
          <ul>
            <li>
              <Link
                to="/login"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Tạo mới tài khoản
              </Link>
            </li>
            <li>
              <Link
                to="/profile/myProfile"
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
              >
                Chi tiết tài khoản
              </Link>
            </li>
          </ul>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FooterContent;
