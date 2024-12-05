import React from "react";
import { Form, Input, Row, Col } from "antd";

// type SizeType = Parameters<typeof Form>[0]['size'];

type IProp = {
  category: Category;
  handleChangeCategory: (value: Partial<Category>) => void;
  isEditMode: boolean;
};

interface Category {
  category_id?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type FieldType = {
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

const FormCategory: React.FC<IProp> = ({
  category,
  handleChangeCategory,
  isEditMode,
}) => {
  const [form] = Form.useForm();

  const handleChangeValue = (values: Partial<Category>) => {
    handleChangeCategory({ ...values });
  };

  form.setFieldsValue({
    ...category,
    createdAt: new Date(category.createdAt).toLocaleDateString(),
    updatedAt: new Date(category.updatedAt).toLocaleDateString(),
  });

  return (
    <div className="w-full flex items-end justify-center">
      <Row justify="center" style={{ marginTop: "50px" }}>
        <Col>
          <Form
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            form={form}
            onValuesChange={handleChangeValue}
          >
            <Form.Item<FieldType>
              label="Tên"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item name="createdAt" label="Thời gian tạo">
              <Input type="text" disabled />
            </Form.Item>
            {isEditMode && (
              <Form.Item name="updatedAt" label="Thời gian cập nhật">
                <Input type="text" disabled />
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default FormCategory;
