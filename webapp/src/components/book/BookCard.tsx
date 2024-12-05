import { Card, Flex, Image } from "antd";
import { formatPrice } from "../../utils/priceFormat";

import { StarFilled } from "@ant-design/icons";
import { CategoryTag } from "../category/CategoryTag";
import { formatCamelCase } from "../../utils/formatText";

interface IBookCardProps {
  book_title: string;
  category: string;
  author: string;
  book_image: string;
  original_price: number;
  sale_price: number;
  ratings: number;
  total_reviews: number;
  onClick: () => void;
}

const BookCard = (props: IBookCardProps) => {
  return (
    <Card
      hoverable
      cover={
        <Image
          preview={false}
          className="rounded-t-md"
          width={240}
          height={300}
          alt="book-img"
          src={props.book_image}
        />
      }
      className="border-2 w-60"
      onClick={props.onClick}
    >
      <CategoryTag tagName={props.category} />
      <Card.Meta title={props.book_title} />
      <Flex vertical gap={4} className="mt-1 text-sm text-black-2">
        <p className="line-clamp-1">{formatCamelCase(props.author)}</p>
        <Flex gap={16}>
          <p className="text-2xl font-bold text-soft-red">
            {formatPrice(props.sale_price)}
          </p>
          {props.sale_price !== props.original_price && (
            <p className="line-through">{formatPrice(props.original_price)}</p>
          )}
        </Flex>
        <Flex justify="space-between">
          <p>
            <StarFilled className="text-soft-red mr-1" />
            {props.ratings}
          </p>
          <p>{props.total_reviews} lượt mua</p>
        </Flex>
      </Flex>
    </Card>
  );
};

export default BookCard;
