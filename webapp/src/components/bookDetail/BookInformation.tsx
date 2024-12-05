import { Flex, InputNumber, Rate, Table, notification } from 'antd';
import Button from '../button/Button';
import { formatPrice } from '../../utils/priceFormat';
import { TBookDetail, TProperty } from '../../types/book';
import { NotificationType } from '../../types/type';
import { useAppDispatch } from '../../hook/hook';
import { updateCart } from '../../store/cart/cartSlice';
import { TCartItem } from '../../types/cart';
import { useState } from 'react';
import { MAX_DESCRIPTION_WORDS } from '../../types/const';

interface IBookInformationProps {
  bookInformation: TBookDetail;
  purchaseQuantity: number;
  handleChangeQuantity: (quantity: number) => void;
}

type TPropertyObject = {
  propName: string;
  propValue: string | undefined;
};

const { Column } = Table;

const BookInformation = (props: IBookInformationProps) => {
  const { purchaseQuantity, handleChangeQuantity } = props;

  const addAmountButton = (
    <button
      className='cursor-pointer'
      onClick={() => handleChangeQuantity(purchaseQuantity + 1)}
    >
      +
    </button>
  );

  const [api, contextHolder] = notification.useNotification();
  const [isExpandDescription, setIsExpandDescription] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addItemToCart = () => {
    const newItem: TCartItem = {
      id: props.bookInformation.bookId,
      title: props.bookInformation.title,
      imageURL: props.bookInformation.thumbnail,
      quantity: props.purchaseQuantity,
      originalPrice: props.bookInformation.price?.basePrice,
      salePrice: props.bookInformation.price?.discountPrice,
    };
    dispatch(updateCart(newItem));
    openNotificationWithIcon('success');
  };

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Thành công',
      description: 'Sản phẩm đã được thêm vào giỏ hàng',
    });
  };

  const minusAmountButton = (
    <button
      className='cursor-pointer disabled:cursor-not-allowed'
      onClick={() => handleChangeQuantity(purchaseQuantity - 1)}
      disabled={purchaseQuantity < 2}
    >
      -
    </button>
  );

  const handleChange = (value: number | null) => {
    handleChangeQuantity(value || 1);
  };

  const data = [
    {
      propName: 'Nhà xuất bản',
      propValue: props.bookInformation.publisher?.name,
    },
    {
      propName: 'Tác giả',
      propValue: props.bookInformation.authors?.at(0)?.name,
    },
  ];

  const appendProperties = (
    data: TPropertyObject[] | undefined,
    properties: TProperty[] | undefined
  ) => {
    if (!data || !properties) {
      return;
    }
    properties.forEach((property) => {
      const newProperty: TPropertyObject = {
        propName: property.name,
        propValue: property.value,
      };
      data.push(newProperty);
    });
    return data;
  };

  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} className='w-full sm:w-1/2 lg:w-2/5'>
        <Flex vertical gap={16} className='size-auto rounded-lg shadow-lg p-4'>
          <h1 className='text-4xl font-bold'>{props.bookInformation.title}</h1>
          <Flex className='text-md'>
            <Flex
              justify='space-between'
              className='w-full flex-col md-flex-row'
            >
              <p>
                Nhà cung cấp:{' '}
                <strong>{props.bookInformation.publisher?.name}</strong>
              </p>
              <p>
                Tác giả:{' '}
                <strong>{props.bookInformation.authors?.at(0)?.name}</strong>
              </p>
            </Flex>
          </Flex>
          <Flex gap={16} className='text-md'>
            <Rate disabled defaultValue={props.bookInformation.averageRating} />
            <p>{`(${props.bookInformation.totalReviewsCount} đánh giá) | Đã bán ${props.bookInformation.totalSalesCount}`}</p>
          </Flex>
          <Flex gap={8}>
            <h1 className='text-soft-red font-bold text-3xl'>
              {formatPrice(
                props.bookInformation.price
                  ? props.bookInformation.price?.basePrice -
                      props.bookInformation.price?.discountPrice
                  : 0
              )}
            </h1>
            <p className='text-md text-grey line-through'>
              {formatPrice(
                props.bookInformation.price
                  ? props.bookInformation.price?.basePrice
                  : 0
              )}
            </p>
          </Flex>
          <Flex gap={8} className='flex-col lg:flex-row items-center'>
            <p>Số lượng</p>
            <InputNumber
              className='[&::-webkit-inner-spin-button]:appearance-none w-28 min-w-48'
              controls={false}
              min={1}
              defaultValue={1}
              value={purchaseQuantity}
              addonBefore={minusAmountButton}
              addonAfter={addAmountButton}
              onChange={(val: number | null) => handleChange(val)}
              changeOnBlur={true}
            />
            <Button
              isDisable={props.bookInformation.quantity <= 0}
              onClick={addItemToCart}
              bgColor={
                props.bookInformation.quantity <= 0
                  ? 'var(--grey)'
                  : 'var(--soft-red)'
              }
              textColor='#FFFFFF'
              text={
                props.bookInformation.quantity <= 0
                  ? 'Hết hàng'
                  : 'Thêm vào giỏ hàng'
              }
            />
          </Flex>
        </Flex>
        <Flex
          vertical
          gap={8}
          className={`size-auto rounded-lg text-md shadow-lg p-4`}
        >
          <h1 className='text-xl font-bold'>Mô tả sách</h1>
          {props.bookInformation.description && (
            <div
              className={!isExpandDescription ? 'max-h-96 line-clamp-6' : ''}
              dangerouslySetInnerHTML={{
                __html: props.bookInformation.description,
              }}
            ></div>
          )}
          <p
            onClick={() => setIsExpandDescription(!isExpandDescription)}
            className={`hover: text-soft-red font-bold cursor-pointer ${
              props.bookInformation.description.length < MAX_DESCRIPTION_WORDS
                ? 'hidden'
                : ''
            }`}
          >
            {isExpandDescription ? 'Thu gọn' : 'Xem thêm'}
          </p>
        </Flex>
        <Flex vertical className='size-auto rounded-lg text-xl shadow-lg p-4'>
          <h1 className='text-xl font-bold'>Thông tin chi tiết</h1>
          <Table
            dataSource={appendProperties(
              data,
              props.bookInformation.properties
            )}
            pagination={false}
            showHeader={false}
            rowKey={'propName'}
          >
            <Column
              className='text-md text-grey'
              dataIndex='propName'
              key='propName'
            />
            <Column className='text-xs' dataIndex='propValue' key='propValue' />
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default BookInformation;
