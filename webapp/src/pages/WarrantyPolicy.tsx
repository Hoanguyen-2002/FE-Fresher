import React from "react";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
const WarrantyPolicy: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <Typography className="text-justify">
        <Title level={2} className="text-center">
          CHÍNH SÁCH BẢO HÀNH
        </Title>
        <Title level={4} className="text-center">
          Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Fahasa.com
        </Title>

        <ol>
          <li>
            <strong>Tôi có thể bảo hành sản phẩm tại đâu?</strong>
            <Paragraph>
              Bảo hành chính hãng: Đối với các sản phẩm điện tử, đồ chơi điện
              tử,... có tem phiếu cam kết bảo hành từ Hãng, khách hàng có thể
              mang sản phẩm đến trực tiếp Hãng để bảo hành mà không cần thông
              qua Fahasa.com.
            </Paragraph>
            <Paragraph>
              Bảo hành thông qua Fahasa.com: khách hàng liên hotline 1900636467
              hoặc truy cập www.fahasa.com/chinh-sach-bao-hanh-san-pham để được
              hỗ trợ tư vấn về thực hiện bảo hành
            </Paragraph>
          </li>
          <li>
            <strong>Tôi có thể được bảo hành sản phẩm miễn phí không?</strong>
            <Paragraph>
              Sản phẩm của quý khách được bảo hành miễn phí chính hãng khi:
            </Paragraph>
            <ul>
              <li>
                Còn thời hạn bảo hành (dựa trên tem/phiếu bảo hành hoặc thời
                điểm kích hoạt bảo hành điện tử).
              </li>
              <li>Tem/phiếu bảo hành còn nguyên vẹn</li>
              <li>Sản phẩm bị lỗi kỹ thuật.</li>
            </ul>
            <Paragraph>Các trường hợp có thể phát sinh phí bảo hành:</Paragraph>
            <ul>
              <li>Sản phẩm hết thời hạn bảo hành</li>
              <li>
                Sản phẩm bị bể, biến dạng, cháy, nổ, ẩm thấp trong động cơ hoặc
                hư hỏng trong quá trình sử dụng.
              </li>
              <li>
                Sản phẩm bị hư hỏng do lỗi của người sử dụng, không xuất phát từ
                lỗi vốn có của hàng hóa.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sau bao lâu tôi có thể nhận lại sản phẩm bảo hành?</strong>
            <Paragraph>
              Nếu sản phẩm của quý khách vẫn còn trong thời hạn bảo hành trên
              team phiếu bảo hành của Hãng, Fahasa khuyến khích quý khách gửi
              trực tiếp đến trung tâm của Hãng để được hỗ trợ bảo hành trong
              thời gian nhanh nhất
            </Paragraph>
            <Paragraph>
              Trường hợp quý khách gửi hàng về Fahasa.com, thời gian bảo hành dự
              kiến trong vòng 21- 45 ngày tùy thuộc vào điều kiện sẵn có của
              linh kiện thay thế từ nhà sản xuất/lỗi sản phẩm (không tính thời
              gian vận chuyển đi và về). Đối với sản phẩm
            </Paragraph>
          </li>
          <li>
            <strong>Fahasa.com bảo hành bằng các hình thức nào?</strong>
            <Paragraph>
              Sản phẩm tại Fahasa.com sẽ được bảo hành bằng 1 trong 4 hình thức
              sau:
            </Paragraph>
            <ul>
              <li>
                Hóa đơn: khách hàng mang theo hóa đơn trực tiếp hoặc hóa đơn giá
                trị gia tăng có thông tin của sản phẩm để được bảo hành.
              </li>
              <li>
                Phiếu bảo hành: đi kèm theo sản phẩm, có đầy đủ thông tin về nơi
                bảo hành và điều kiện bảo hành.
              </li>
              <li>
                Tem bảo hành: loại tem đặc biệt chỉ sử dụng một lần, được dán
                trực tiếp lên sản phẩm. Sản phẩm còn trong thời hạn bảo hành
                phải thỏa điều kiện tem còn nguyên vẹn và thời gian bảo hành
                phải trước ngày được viết trên tem
              </li>
              <li>
                Điện tử: là chế độ bảo hành sản phẩm trực tuyến thay thế cho
                phương pháp bảo hành thông thường bằng giấy hay thẻ bảo hành
                bằng cách: nhắn tin SMS kích hoạt, quét mã QR-Code từ tem nhãn,
                đăng ký trên website hoặc bằng ứng dụng bảo hành
              </li>
            </ul>
          </li>
          <li>
            <strong>Fahasa.com có bảo hành quà tặng kèm sản phẩm không?</strong>
            <Paragraph>
              Fahasa.com rất tiếc hiện chưa hỗ trợ bảo hành quà tặng đi kèm sản
              phẩm chính.{" "}
            </Paragraph>
          </li>
        </ol>
      </Typography>
    </div>
  );
};
export default WarrantyPolicy;
