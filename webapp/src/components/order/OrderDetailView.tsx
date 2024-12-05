import { Card } from "antd";
import { TOrder, TOrderItem } from "../../types/order";
import { OrderStatus } from "../../enum/OrderStatus";
import { ColumnsType } from "antd/es/table";
import OrderStatusTag from "./OrderStatusTag";
import OrderStatusTracking from "./OrderStatusTracking";
import OrderDetailTable from "./OrderDetailTable";
import { formatId } from "../../utils/populate";

const cardTitleCss: React.CSSProperties = {
  fontSize: "16px",
  textAlign: "left",
  border: "none",
  minHeight: "0px",
  padding: "0px 0px 10px 0px",
  marginLeft: "-20px",
};

const CardTitle = ({
  data,
}: {
  data: {
    id?: string;
    status?: OrderStatus;
  };
}) => {
  return (
    <div className="flex lg:justify-between flex-col lg:flex-row">
      <div className="overview flex lg:justify-start justify-between items-center">
        <div className="text-[12px] bg-[#F2F4F5] px-5 py-1 text-[#7A7E7F] mr-1 font-bold [clip-path:polygon(0_0,_100%_0,_90%_50%,_100%_100%,_0_100%)]">
          Kiện hàng
        </div>
        <div className="mr-2 hidden lg:visible">Mã đơn hàng</div>
        <div>{formatId(data.id)}</div>
      </div>
      <div className="lg:flex hidden lg:visible items-center">
        <div className="text-[#2489F4]">Tra cứu vận chuyển</div>
        <div className="border-l-2 border-[#CDCFD0] h-5 mx-2"></div>
        <OrderStatusTag data={{ status: data.status }} />
      </div>
    </div>
  );
};

const OrderDetailView = ({ data, columns }: { data?: Partial<TOrder>, columns: ColumnsType<Partial<TOrderItem>> }) => {
  return (
    <div className="order-detail-container bg-white shadow-lg rounded-lg mx-auto p-5 mb-5">
      <Card
        bordered={false}
        className="!shadow-none border-none !overflow-visible"
        title={<CardTitle data={{ id: data?.orderId, status: data?.status }} />}
        styles={{ header: cardTitleCss, body: { padding: "0px" } }}
      >
        <OrderStatusTracking data={{ status: data?.status }} />
      </Card>
      <OrderDetailTable {...{data: data, columns: columns}} />
    </div>
  );
};

export default OrderDetailView;
