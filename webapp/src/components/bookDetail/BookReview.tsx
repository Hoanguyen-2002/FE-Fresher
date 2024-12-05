import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Flex, Progress, Rate, Row, Typography, Card, Space } from "antd";
import { TBookListReview } from "../../types/review";
import { useEffect, useState } from "react";
import { getProductReview } from "../../api/products";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const BookReview = () => {
  const { id } = useParams<{ id: string }>();
  const [bookReviews, setBookReview] = useState<TBookListReview | null>(null);

  const getBookReview = async () => {
    try {
      const response = await getProductReview(id);
      setBookReview(response);
    } catch (err) {
      console.log(err);
    }
  };

  const totalRating =
    bookReviews?.reviews.reduce((total, item) => (total += item.rating), 0) ||
    0;
  const average = !bookReviews?.totalItems
    ? 0
    : parseFloat((totalRating / bookReviews.totalItems).toFixed(1));

  const countRatings = (bookReviews: TBookListReview | null) => {
    const ratingCounts: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    bookReviews?.reviews.forEach((review) => {
      ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
    });

    return ratingCounts;
  };

  const calculatePercentages = (ratingsCount: Record<number, number>) => {
    const totalRatings = Object.values(ratingsCount).reduce(
      (sum, count) => sum + count,
      0
    );

    return Object.entries(ratingsCount).map(([stars, count]) => ({
      stars: Number(stars),
      percentage: totalRatings
        ? parseFloat(((count / totalRatings) * 100).toFixed(2))
        : 0,
    }));
  };

  const ratingsCount = countRatings(bookReviews);
  const ratings = calculatePercentages(ratingsCount);

  useEffect(() => {
    getBookReview();
  }, []);

  return (
    <Flex vertical className="p-1">
      <h1 className="text-[28px] font-bold mt-4">Đánh giá sản phẩm</h1>
      <Row>
        <Col span={16} offset={4} className={"max-w-[800px]"}>
          <Row className="my-8">
            <Col xs={24} sm={16} md={8} className="text-center">
              <Row className="text-center mx-2 mt-2">
                <Title level={1}>
                  {average}
                  <small className="text-lg">/5</small>
                </Title>
              </Row>
              <Row className="mx-2">
                <Rate allowHalf disabled value={average} />
              </Row>
              <Row className="mx-2">
                <Text type="secondary">
                  {bookReviews?.totalItems || 0} đánh giá
                </Text>
              </Row>
            </Col>
            <Col xs={24} sm={16} md={12} className="text-start">
              {ratings.map((rating) => (
                <Row key={rating.stars} className="mb-2" align="middle">
                  <Col xs={6} sm={4} md={3}>
                    <Text>{rating.stars} sao</Text>
                  </Col>
                  <Col xs={12} sm={16} md={17}>
                    <Progress percent={rating.percentage} showInfo={false} />
                  </Col>
                  <Col xs={6} sm={4} md={4} className="text-right">
                    <Text>{rating.percentage}%</Text>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
          {bookReviews?.reviews.map((bookReview, index) => (
            <Card className="mb-2" key={index}>
              <Row>
                <Col>
                  <Space direction="vertical" size="small">
                    <Space align="center">
                      <Text strong>{bookReview?.username}</Text>
                      <Text type="secondary">
                        {bookReview?.created_at.split("T")[0]}
                      </Text>
                    </Space>
                    <Space>
                      <Rate disabled value={bookReview?.rating} />
                    </Space>
                    <Space align="center">
                      <CheckCircleOutlined style={{ color: "green" }} />
                      <Text style={{ color: "green" }}>Đã mua hàng</Text>
                    </Space>
                  </Space>
                </Col>
                <Col offset={1}>
                  <Row>
                    {bookReview.images.map((image, index) => (
                      <Col className="mx-3 mb-3" key={index}>
                        <img className="size-28" src={image?.imageUrl}></img>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Text>{bookReview?.comment}</Text>
            </Card>
          ))}
        </Col>
      </Row>
    </Flex>
  );
};

export default BookReview;
