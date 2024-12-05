import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  Rate,
  Space,
  notification,
} from "antd";
import React, { useEffect } from "react";
import MultipleImageUploader from "../form/MuiltipleImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import { TCreateReview } from "../../types/review";
import { createReview } from "../../api/review";
import { NotificationType } from "../../types/type";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { RootState } from "../../store/configureStore";
import {
  removeAllDescriptionImages,
  setThumbnailUrl,
} from "../../store/image/imageSlice";

const { TextArea } = Input;
const accessToken = localStorage.getItem("accessToken");

const OrderReviews: React.FC = () => {
  const { orderDetailId } = useParams<{ orderDetailId: string }>();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/profile/myOrders");
    dispatch(removeAllDescriptionImages());
  };
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  const imagesStore = useAppSelector((state: RootState) => state.image);

  const openAddReviewNotification = (
    type: NotificationType,
    status: string,
    message: string
  ) => {
    api[type]({
      message: status,
      description: message,
    });
  };

  const handleSave = async (value: any) => {
    const formData: TCreateReview = {
      comment: value.review.trim(),
      rating: value.rating,
      images: imagesStore.descriptionImages,
    };

    try {
      console.log(formData);
      console.log("ordorderid", orderDetailId);
      const response = await createReview(formData, orderDetailId);
      console.log("response", response);
      if (response) {
        openAddReviewNotification(
          "success",
          "Thành Công",
          "Đánh giá sản phẩm thành công"
        );
        dispatch(removeAllDescriptionImages());
        setTimeout(() => {
          navigate("/profile/myOrders");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    dispatch(removeAllDescriptionImages());
    return () => {
      dispatch(setThumbnailUrl(""));
      dispatch(removeAllDescriptionImages());
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Flex justify={"center"} className="py-10">
        <Card
          title={
            <h2 className=" mx-4 md:mx-10 text-center font-bold text-lg md:text-xl">
              Đánh giá sản phẩm
            </h2>
          }
          bordered={true}
          className="w-full max-w-[90%] md:max-w-[600px] shadow-md rounded-lg bg-white"
        >
          <Form
            // labelCol={{ span: 5 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            className="my-8"
            onFinish={handleSave}
          >
            <Form.Item
              label="Đánh giá: "
              name="review"
              rules={[
                { required: true, message: "Vui lòng nhập đánh giá!" },
                {
                  validator: (_, value) => {
                    if (!value || value.trim() === "") {
                      return Promise.reject(
                        new Error("Không được để khoảng trắng!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <TextArea rows={4} maxLength={255} />
            </Form.Item>

            <Form.Item
              label="Đánh giá sao"
              layout="horizontal"
              name="rating"
              rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item label="Thêm hình ảnh" name="images">
              <Space>
                <MultipleImageUploader />
              </Space>
            </Form.Item>
            <Form.Item className="text-end">
              <Button htmlType="submit" type="primary" className="mx-4">
                Lưu
              </Button>
              <Button onClick={handleCancel} type="primary" danger>
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default OrderReviews;
