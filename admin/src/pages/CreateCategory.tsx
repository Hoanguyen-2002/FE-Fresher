import React from "react";
import { Button, Flex, Form, Input, notification } from "antd";
import { createCategory } from "../api/categories";
import { TCategoryBody } from "../types/category";
import { useNavigate } from "react-router-dom";

type Category = {
  name: string;
  createdAt: string;
};
type NotificationType = "success" | "info" | "warning" | "error";

const CreateCategory: React.FC = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
    try {
      const response = await createCategory(formData);
      if (response) {
        form.resetFields();
        openCreateProductNotification(
          "success",
          "Thành Công",
          "Tạo mới danh mục thành công"
        );
        setTimeout(() => {navigate("/admin/categoryList")}, 1000 )
      } else {
        openCreateProductNotification(
          "error",
          "Thất bại",
          "Tạo mới danh mục thất bại"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex vertical gap={32} justify="center" align="center">
        <h1 className="text-4xl font-bold pt-5">Tạo danh mục mới</h1>
        <Form
          form={form}
          name="createProductForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          autoComplete="off"
          variant="filled"
          initialValues={{ createdAt: currentDate }}
          onFinish={onFinish}
          className="w-full lg:w-1/2 items-center shadow-md rounded-xl p-8"
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: "Tên danh mục không được bỏ trống!" },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item label="Thời gian tạo" name="createdAt">
            <Input disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default CreateCategory;
