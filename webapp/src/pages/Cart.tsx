import { Button, Flex, message, notification } from "antd";
import { useMemo } from "react";
import { TCartItem } from "../types/cart";
import { useAppDispatch, useAppSelector } from "../hook/hook";
import {
  cartSelector,
  removeAllItem,
  removeFromCart,
  setCart,
  updateItemQuantity,
} from "../store/cart/cartSlice";
import { formatPrice } from "../utils/priceFormat";
import EditableTable, {
  CustomColumnOptions,
} from "../components/editTable/EditTable";
import { checkout } from "../api/checkout";
import { TItemList } from "../types/checkout";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";

type NotificationType = "success" | "info" | "warning" | "error";

function Cart() {
  const [api, contextHolder] = notification.useNotification();
  // const [itemNote, setItemNode] = useState<[]>([])
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 640;
  const {
    cartReducer: { cartItem: cartItems },
  } = useAppSelector(cartSelector);

  const calculateTotalPrice = useMemo(() => {
    console.log(cartItems);
    return cartItems.reduce(
      (accumulator, currentValue) =>
        accumulator +
        (currentValue.originalPrice - currentValue.salePrice) *
          currentValue.quantity,
      0
    );
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const itemList: TItemList[] = [];
      cartItems.forEach((item) => {
        const newItem: TItemList = {
          bookId: item.id,
          quantity: item.quantity,
          originalPrice: item.originalPrice,
          salePrice: item.salePrice,
        };
        itemList.push(newItem);
      });
      const response = await checkout({ itemList: itemList });
      if (response) {
        if (response === null) {
          message.error("Có lỗi xảy ra, vui lòng thử lại")
        }
        if (response.result === 0) {
          dispatch(removeAllItem());
          navigate(`checkout/${response.orderId}`);
        } else {
          dispatch(setCart(response.itemResponseList));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (targetItem: TCartItem) => {
    dispatch(removeFromCart(targetItem));
    openRemoveFromCartNotification("success", targetItem);
  };

  const clearCart = () => {
    dispatch(removeAllItem());
  };

  const handleUpdateQuantity = (record: TCartItem) => {
    if (record.quantity == 0) {
      removeCartItem(record);
    } else {
      dispatch(
        updateItemQuantity({ id: record.id, quantity: record.quantity })
      );
    }
  };

  const columns: CustomColumnOptions<TCartItem>[] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: TCartItem) => (
        <>
          <p>{record.title}</p>
          {record.note ? <p className="text-soft-red">{record.note}</p> : <></>}
          <p className="text-soft-red font-bold md:hidden">
            {formatPrice(record.originalPrice - record.salePrice)}
          </p>
        </>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageURL",
      key: "imageURL",
      responsive: ["md", "lg"],
      render: (imageURL: string) => (
        <img className="size-32" src={imageURL}></img>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity" as const,
      key: "quantity",
      editor: {
        inputType: "number",
        handleSave: handleUpdateQuantity,
        minValue: 0,
      },
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
      responsive: ["md", "lg"],
      render: (price: number) => <span>{formatPrice(price)}</span>,
    },
    {
      title: "Giá giảm",
      dataIndex: "salePrice",
      key: "salePrice",
      responsive: ["md", "lg"],
      render: (price: number) => <span>{formatPrice(price)}</span>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: TCartItem) => (
        <Button onClick={() => removeCartItem(record)} type="primary">
          Xóa
        </Button>
      ),
    },
  ];

  const openRemoveFromCartNotification = (
    type: NotificationType,
    item: TCartItem
  ) => {
    api[type]({
      message: "Thành công",
      description: `Sản phẩm ${item.title} đã được xóa khỏi giỏ hàng`,
    });
  };

  return (
    <>
      {contextHolder}
      <Flex gap={32} vertical className="px-8 py-4 md:px-24 md:py-8">
        <Flex className="w-full justify-between">
          <h1 className="text-2xl md:text-4xl font-bold">
            Giỏ hàng {`(${cartItems.length} sản phẩm)`}
          </h1>
          <Flex gap={32} className={isMobile ? "hidden" : "flex"}>
            <h1 className="text-2xl font-bold text-right md:text-left">
              Tổng tiền: {formatPrice(calculateTotalPrice)}
            </h1>
            <Button onClick={handleCheckout} type="primary">
              Đặt hàng
            </Button>
          </Flex>
        </Flex>
        {/* <Table columns={columns} dataSource={cartItems} /> */}
        {cartItems.length > 0 ? (
          <>
            <EditableTable<TCartItem>
              columns={columns}
              dataSource={cartItems}
              rowKey={"id"}
            />
            <Button className="w-36 m-auto" type="primary" onClick={clearCart}>
              Xóa tất cả
            </Button>
          </>
        ) : (
          <EmptyCart />
        )}
      </Flex>
      <Flex
        className={
          !isMobile
            ? "hidden"
            : "bg-white flex fixed bottom-0 left-0 w-full justify-between"
        }
      >
        <h1 className="text-xl font-bold text-center w-1/2 md:text-left">
          Tổng tiền: <br /> {formatPrice(calculateTotalPrice)}
        </h1>
        <div
          onClick={handleCheckout}
          className="w-1/2 bg-soft-red flex text-white text-center text-2xl items-center justify-center cursor-pointer"
        >
          <p>Đặt hàng</p>
        </div>
      </Flex>
    </>
  );
}

export default Cart;
