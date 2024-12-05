import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPInput from "./pages/OTPInput";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPass from "./pages/ResetPass";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import CommonBreadcrumb from "./components/breadcrumb/Breadcrumb";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ReturnPolicy from "./pages/ReturnPolicy";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Books from "./pages/Books";
import Checkout from "./pages/Checkout";
import BookDetail from "./pages/BookDetail";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import HeaderContent from "./components/header/Header";
import FooterContent from "./components/footer/Footer";
import ProfileEdit from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import OrderReviews from "./components/orderreview/OrderReview";
import OrderTracking from "./pages/OrderTracking";
import ThankYouPage from "./pages/ThankYouPage";
import OrderTrackingDetail from "./pages/OrderTrackingDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Content>
          <div className="size-full bg-white min-h-96">
            <CommonBreadcrumb />
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/checkout/success/:orderId"
                element={<ThankYouPage />}
              ></Route>
              <Route path="/review/:orderDetailId" element={<OrderReviews />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/verifyCodeInput" element={<OTPInput />}></Route>
              <Route path="/forgotPass" element={<ForgotPassword />}></Route>
              <Route path="/resetPass" element={<ResetPass />}></Route>
              <Route path="/orderTracking" element={<OrderTracking />}></Route>
              <Route path="/orderTracking/:id" element={<OrderTrackingDetail/>}></Route>
              <Route path="/profile" element={<Profile />}>
                <Route
                  path="/profile/myProfile"
                  element={<ProfileEdit />}
                ></Route>
                <Route
                  path="/profile/changePassword"
                  element={<ResetPass />}
                ></Route>
                <Route path="/profile/myOrders" element={<MyOrders />}></Route>
                <Route
                  path="/profile/myOrders/orderDetail/:orderId"
                  element={<OrderDetail />}
                ></Route>
                <Route path="/profile/myReviews"></Route>
                <Route path="/profile/notifications"></Route>
              </Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/book/:id" element={<BookDetail />}></Route>
              <Route path="/books" element={<Books />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route
                path="/cart/checkout/:orderId"
                element={<Checkout />}
              ></Route>
              <Route
                path="/checkout/success/:orderId"
                element={<ThankYouPage />}
              ></Route>
              <Route
                path="/dieu-khoan-su-dung"
                element={<TermsOfService />}
              ></Route>
              <Route
                path="/chinh-sach-bao-mat"
                element={<PrivacyPolicy />}
              ></Route>
              <Route path="/gioi-thieu" element={<AboutUs />}></Route>
              <Route
                path="/chinh-sach-doi-tra-hoan-tien"
                element={<ReturnPolicy />}
              ></Route>
              <Route
                path="/chinh-sach-bao-hanh"
                element={<WarrantyPolicy />}
              ></Route>
              <Route
                path="/chinh-sach-van-chuyen"
                element={<ShippingPolicy />}
              ></Route>
            </Routes>
          </div>
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
