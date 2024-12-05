import React from "react";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
const ShippingPolicy: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <Typography className="text-justify">
        <Title level={2} className="text-center">
          CHÍNH SÁCH VẬN CHUYỂN
        </Title>
        <Title level={4} className="text-center">
          Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Fahasa.com
        </Title>

        <ol>
          <li>
            <strong>Chính sách vận chuyển:</strong>
            <Paragraph>
              Fahasa.com cung cấp dịch vụ giao hàng toàn quốc, gửi hàng tận nơi
              đến địa chỉ cung cấp của Quý khách. Thời gian giao hàng dự kiến
              phụ thuộc vào kho có hàng và địa chỉ nhận hàng của Quý khách.
            </Paragraph>
            <Paragraph>
              Với đa phần đơn hàng, Fahasa.com cần vài giờ làm việc để kiểm tra
              thông tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng,
              Fahasa.com sẽ nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn
              hàng có sản phẩm sắp phát hành, Fahasa.com sẽ ưu tiên giao những
              sản phẩm có hàng trước cho Quý khách hàng.
            </Paragraph>
          </li>
          <li>
            <strong>Một số lưu ý khi nhận hàng:</strong>
            <ul>
              <li>
                Trước khi tiến hành giao hàng cho Quý khách, bưu tá của Đối tác
                vận chuyển sẽ liên hệ qua số điện thoại của Quý khách trước
                khoảng 3 đến 5 phút để xác nhận giao hàng.
              </li>
              <li>
                Nếu Quý khách không thể có mặt trong đợt nhận hàng thứ nhất,
                Fahasa.com sẽ cố gắng liên lạc lại thêm ít nhất 2 lần nữa (trong
                02 ca giao hàng khác nhau) để sắp xếp thời gian giao hàng, Quý
                khách vui lòng để ý điện thoại để liên hệ được với bưu tá giao
                hàng.
              </li>
              <li>
                Nếu qua 3 lần liên hệ giao hàng, Fahasa.com vẫn không thể liên
                lạc được với Quý khách để giao hàng, Fahasa.com sẽ thông báo cho
                Quý khách về việc hủy đơn hàng. Trong trường hợp Quý khách đã
                thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào
                tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ
                xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ trừ lại chi
                phí vận chuyển phát sinh từ việc giao hàng nhưng Quý khách không
                nhận hàng.
              </li>
              <li>
                Trong trường hợp Quý khách không đồng ý nhận hàng với xuất phát
                nguyên nhân từ hàng hóa của Fahasa.com không đảm bảo, không đúng
                như mô tả, giao trễ so với cam kết,... Đơn hàng của Quý khách sẽ
                được hoàn lại cho chúng tôi và được hủy trên hệ thống
                Fahasa.com. Nếu Quý khách đã thanh toán trước cho đơn hàng, Quý
                khách sẽ nhận lại tiền vào tài khoản trong vòng 5 - 7 ngày làm
                việc, phụ thuộc vào tiến độ xử lý của ngân hàng. Số tiền Quý
                khách nhận lại sẽ là toàn bộ số tiền đã thanh toán cho đơn hàng
                (bao gồm phí vận chuyển).
              </li>
              <li>
                Trong trường hợp đơn hàng đang giao đến Quý khách có ngoại quan
                bên ngoài hộp hàng hóa có dấu hiệu bị rách, móp, ướt, thủng, mất
                niêm phong,…Quý khách vui lòng kiểm tra kỹ chất lượng sản phẩm
                bên trong trước khi nhận hàng. Quý khách hoàn toàn có quyền từ
                chối nhận hàng và báo về cho chúng tôi qua hotline 1900636467 để
                được hỗ trợ giao lại đơn hàng mới hoặc hủy đơn hàng, hoàn tiền.
              </li>
              <li>
                Trong trường hợp Quý khách không có nhu cầu nhận hàng, Quý khách
                có thể báo với bên vận chuyển và/hoặc CSKH (qua Hotline
                1900636467) về việc này. Đơn hàng của Quý khách sẽ được hoàn lại
                cho chúng tôi và được hủy trên hệ thống. Trong trường hợp Quý
                khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại
                tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào
                tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ trừ
                lại chi phí vận chuyển phát sinh từ việc giao hàng nhưng Quý
                khách không nhận.
              </li>
              <li>
                Fahasa.com sẽ thông báo ngay đến Quý khách nếu có sự chậm chễ về
                thời gian giao hàng so với thời gian dự kiến ở trên. Trong phạm
                vi pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm cho
                bất cứ tổn thất nào, các khoản nợ, thiệt hại hoặc chi phí phát
                sinh từ việc giao hàng trễ. Trường hợp phát sinh chậm trễ trong
                việc giao hàng, nếu Quý khách không còn nhu cầu nhận hàng,
                Fahasa.com cam kết sẽ hỗ trợ Quý khách hủy đơn hàng, nếu Quý
                khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại
                tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào
                tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ là
                toàn bộ số tiền đã thanh toán cho đơn hàng (bao gồm phí vận
                chuyển).
              </li>
              <li>
                Sản phẩm được đóng gói theo tiêu chuẩn đóng gói của Fahasa.com,
                nếu Quý khách có nhu cầu đóng gói đặc biệt khác, vui lòng báo
                trước cho chúng tôi khi đặt hàng hàng và cho phép chúng tôi được
                tính thêm phí cho nhu cầu đặc biệt này.
              </li>
            </ul>
          </li>
        </ol>
        <Paragraph></Paragraph>
      </Typography>
    </div>
  );
};
export default ShippingPolicy;
