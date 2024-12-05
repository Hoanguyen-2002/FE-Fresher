import { Flex, Image } from "antd";
import { TBookImage, TBookDetail } from "../../types/book";
interface IImageContainerProps {
  book: TBookDetail;
  thumbnailUrl: string;
  imageUrls: TBookImage[];
  purchaseQuantity: number;
}

const ImageContainer = (props: IImageContainerProps) => {
  return (
    <>
      <Flex vertical gap={8} className="p-4 w-full sm:w-1/2 lg:w-2/5">
        <Image preview={false} src={props.thumbnailUrl}></Image>
        <Flex gap={2} justify="center">
          {props.imageUrls.map((book, index) => (
            <Image key={index} src={book.imageUrl} width={100} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default ImageContainer;
