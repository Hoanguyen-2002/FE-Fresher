import React from "react";
import { Button, Flex, Form, Input, notification } from "antd";
import { updateCategory } from "../api/categories";
import { TCategoryBody } from "../types/category";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hook/hook";
import { categorySelector } from "../store/category/category";

type Category = {
  name: string;
  createdAt: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

const EditCategory: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    categoryReducer: { categoryItem: categorytItems },
  } = useAppSelector(categorySelector);

  console.log("categorytItems?.name", categorytItems?.name);

  const openCreateProductNotification = (
    type: NotificationType,
    status: string,
    message: string
  ) => {
    api[type]({
      message: status,
      description: message,
    });
  };
  const onFinish = async (value: Category) => {
    const formData: TCategoryBody = {
      name: value.name,
    };
    const categoryId = categorytItems ? categorytItems.categoryId : "";

    try {
      const response = await updateCategory(formData, categoryId);
      if (response) {
        openCreateProductNotification(
          "success",
          "Thành Công",
          "Cập nhật danh mục thành công"
        );
        setTimeout(() => {
          navigate("/admin/categoryList");
        }, 1000);
      } else {
        openCreateProductNotification(
          "error",
          "Thất bại",
          "Cập nhật danh mục thất bại"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {contextHolder}

      <Flex vertical gap={32} justify="center" align="center" >
        <h1 className="text-4xl text-center font-bold pt-5">
          Chỉnh sửa danh mục
        </h1>
          <Form
            form={form}
            name="createProductForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10 }}
            autoComplete="off"
            variant="filled"
            initialValues={{
              name: categorytItems?.name,
              createdAt: categorytItems?.createdAt.split("T")[0],
              updatedAt: categorytItems?.updatedAt.split("T")[0],
            }}
            onFinish={onFinish}
            className="w-full lg:w-1/2 items-center shadow-md rounded-xl p-8"
          >
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên danh mục không được bỏ trống!",
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>

            <Form.Item label="Thời gian cập nhật" name="updatedAt">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Thời gian tạo" name="createdAt">
              <Input disabled />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Link to="/">
                <Button
                  type="primary"
                  htmlType="reset"
                  className="mx-3 bg-soft-red"
                >
                  Hủy
                </Button>
              </Link>
            </Form.Item>
          </Form>
      </Flex>
    </>
  );
};

export default EditCategory;
