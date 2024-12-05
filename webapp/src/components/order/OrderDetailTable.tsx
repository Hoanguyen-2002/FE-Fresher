import { Table } from "antd";
import { TOrder, TOrderItem } from "../../types/order";
import { ColumnsType } from "antd/es/table";
import { formatPrice, getPrice } from "../../utils/priceFormat";

const OrderDetailTable = ({ data, columns } : { data?: Partial<TOrder>, columns: ColumnsType<Partial<TOrderItem>> }) => {
  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={data?.orderDetails}
        pagination={false}
        rowKey="orderDetailId" // Sử dụng orderDetailId làm khóa duy nhất
        className="overflow-x-auto"
        scroll={{ x: "max-content" }}
      />
      <div className="flex flex-row justify-end text-[15px] leading-none my-4">
        <div className="title flex flex-col text-left mr-3 min-w-[140px]">
          <div className="text-[#7A7E7F] mb-[10px]">Tạm tính:</div>
          <div className="text-[#7A7E7F] mb-[10px]">Phí vận chuyển:</div>
          <div className="text-[#212121] font-bold">Tổng tiền:</div>
        </div>
        <div className="value flex flex-col text-right min-w-20">
          <div className="mb-[10px]">{formatPrice(getPrice(data?.total) - getPrice(data?.shippingFee))}</div>
          <div className="mb-[10px]">{formatPrice(data?.shippingFee ?? 0)}</div>
          <div className="mb-[10px] text-[#C92127] font-bold">
            {formatPrice(data?.total ?? 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailTable;
