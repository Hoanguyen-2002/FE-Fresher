import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import ProfileLayout from "./pages/ProfileLayout";
import CreateProduct from "./pages/CreateProduct";
import ListCategory from "./pages/ListCategory";
import ListCustomer from "./pages/ListCustomer";
import ListOrder from "./pages/ListOrder";
import ListProduct from "./pages/ListProduct";
import ProtectedRoute from "./ProtectedRoute";
import EditCategory from "./pages/EditCategory";
import CreateCategory from "./pages/CreateCategory";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path={"/admin/createProduct"} element={<CreateProduct />} />
            <Route
              path={"/admin/createCategory"}
              element={<CreateCategory />}
            />
            <Route path={"/admin/productList"} element={<ListProduct />} />
            <Route path={"/admin/categoryList"} element={<ListCategory />} />
            <Route path={"/admin/customerList"} element={<ListCustomer />} />
            <Route path={"/admin/orderList"} element={<ListOrder />} />
            <Route
              path="/admin/editCategory"
              element={<EditCategory />}
            ></Route>
          </Route>
          <Route path="/profile" element={<ProfileLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
