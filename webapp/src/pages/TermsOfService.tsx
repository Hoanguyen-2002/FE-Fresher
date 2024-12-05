import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const TermsOfService: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md">
      <Typography className="text-justify">
        <Title level={2} className="text-center">
          ĐIỀU KHOẢN SỬ DỤNG
        </Title>
        <Paragraph>
          Chào mừng quý khách đến mua sắm tại FAHASA. Sau khi truy cập vào
          website FAHASA để tham khảo hoặc mua sắm, quý khách đã đồng ý tuân thủ
          và ràng buộc với những quy định của FAHASA. Vui lòng xem kỹ các quy
          định và hợp tác với chúng tôi để xây dựng 1 website FAHASA ngày càng
          thân thiện và phục vụ tốt những yêu cầu của chính quý khách. Ngoài ra,
          nếu có bất cứ câu hỏi nào về những thỏa thuận dưới đây, vui lòng liên
          hệ với FAHASA theo số điện thoại hotline 1900636467 hoặc email cho
          chúng tôi qua địa chỉ{" "}
          <a href="mailto:cskh@fahasa.com.vn" className="text-blue-500">
            cskh@fahasa.com.vn
          </a>
          .
        </Paragraph>

        <Divider />

        <Title level={4} className="text-start">
          Tài khoản của khách hàng
        </Title>
        <Paragraph className="text-justify">
          Một số dịch vụ, tính năng tại đây yêu cầu quý khách cần phải đăng ký
          Tài khoản FAHASA thì mới có thể sử dụng. Do đó, để tận hưởng đầy đủ
          các dịch vụ và tính năng này, quý khách vui lòng cho phép FAHASA tiến
          hành xử lý các dữ liệu cá nhân cơ bản sau:
        </Paragraph>

        <Paragraph>
          <ul className="list-disc list-inside">
            <li>
              <strong>Dữ liệu cá nhân cơ bản bắt buộc phải cung cấp:</strong> là
              các thông tin giúp xác định danh tính đối với từng tài khoản
              FAHASA, bao gồm họ tên, địa chỉ email, số điện thoại,... của quý
              khách.
            </li>
            <li>
              <strong>
                Dữ liệu cá nhân cơ bản được cung cấp để phục vụ giao dịch:
              </strong>{" "}
              là các thông tin cần thiết để thực hiện một giao dịch tại website
              fahasa.com, bao gồm địa chỉ giao hàng, địa chỉ thanh toán, phương
              thức thanh toán,... của quý khách.
            </li>
            <li>
              <strong>Dữ liệu cá nhân cơ bản tự nguyện cung cấp:</strong> là các
              thông tin mà quý khách có thể chia sẻ (hoặc không) để cá nhân hóa
              trải nghiệm sử dụng dịch vụ tại FAHASA, bao gồm ngày tháng năm
              sinh, giới tính, sở thích, nghề nghiệp,... của quý khách.
            </li>
          </ul>
        </Paragraph>

        <Paragraph>
          Việc sử dụng và bảo mật thông tin Tài khoản FAHASA là trách nhiệm và
          quyền lợi của quý khách khi sử dụng dịch vụ tại FAHASA. Quý khách phải
          giữ kín mật khẩu và tài khoản, hoàn toàn chịu trách nhiệm đối với tất
          cả các hoạt động diễn ra thông qua việc sử dụng mật khẩu hoặc tài
          khoản của mình. Quý khách nên đảm bảo thoát khỏi Tài khoản FAHASA sau
          mỗi lần sử dụng để bảo mật dữ liệu cá nhân của mình.
        </Paragraph>

        <Paragraph>
          Trong trường hợp thông tin do quý khách cung cấp không đầy đủ hoặc có
          sai sót dẫn đến việc không thể giao hàng cho quý khách, chúng tôi có
          quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu bất
          cứ trách nhiệm nào đối với quý khách. Khi có những thay đổi thông tin
          của quý khách, vui lòng cập nhật lại thông tin trong Tài khoản FAHASA.
        </Paragraph>
        <Title level={4} className="text-start">
          Quyền lợi bảo mật dữ liệu cá nhân của khách hàng
        </Title>
        <Paragraph>
          Khi sử dụng dịch vụ tại website FAHASA, quý khách được đảm bảo rằng
          những thông tin cung cấp cho chúng tôi sẽ chỉ được dùng để nâng cao
          chất lượng dịch vụ dành cho khách hàng của FAHASA và sẽ không được
          chuyển giao cho một bên thứ ba nào khác vì mục đích thương mại. Trường
          hợp quý khách có yêu cầu: rút lại sự đồng ý, xóa, chỉnh sửa, phản đối,
          yêu cầu cung cấp, yêu cầu hạn chế xử lý đối với các dữ liệu cá nhân
          của mình, quý khách vui lòng thao tác trên hệ thống website hoặc liên
          hệ với FAHASA theo số điện thoại hotline 1900636467 hoặc email cho
          chúng tôi qua địa chỉ cskh@fahasa.com.vn.
        </Paragraph>
        <Paragraph>
          Dữ liệu cá nhân của quý khách tại FAHASA sẽ được chúng tôi bảo mật và
          chỉ trong trường hợp pháp luật yêu cầu, chúng tôi sẽ buộc phải cung
          cấp những thông tin này cho các cơ quan có thẩm quyền.
        </Paragraph>

        <Title level={4} className="text-start">
          Trách nhiệm và quyền lợi của FAHASA
        </Title>
        <Paragraph>
          <strong>Trách nhiệm của FAHASA:</strong> Chúng tôi chịu trách nhiệm
          tuân thủ các nguyên tắc về xử lý dữ liệu cá nhân theo đúng quy định
          pháp luật và các điều khoản được nêu ra tại Chính sách bảo mật dữ liệu
          cá nhân của khách hàng (vui lòng xem chi tiết tại đây). Trong trường
          hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm của mình, FAHASA
          sẽ không chịu trách nhiệm về mọi tổn thất phát sinh.
        </Paragraph>
        <Paragraph>
          <strong>Quyền lợi của FAHASA:</strong> Chúng tôi không cho phép bất kỳ
          tổ chức, cá nhân nào quảng bá sản phẩm tại website FAHASA mà chưa có
          sự đồng ý bằng văn bản từ FAHASA. Các thỏa thuận và quy định trong
          Điều khoản sử dụng này có thể thay đổi vào bất cứ lúc nào nhưng sẽ
          được FAHASA thông báo cụ thể trên website FAHASA.
        </Paragraph>
        <Paragraph>
          Ngoài ra, xin vui lòng thông báo cho quản trị web của FAHASA ngay khi
          quý khách phát hiện ra lỗi hệ thống theo số điện thoại hotline
          1900636467 hoặc email cho chúng tôi qua địa chỉ cskh@fahasa.com.vn.
        </Paragraph>

        <Title level={4} className="text-start">
          Hiệu Lực
        </Title>
        <Paragraph>
          Điều Khoản Sử Dụng Dịch Vụ này được cập nhật và có hiệu lực từ ngày
          01/06/2024.
        </Paragraph>
        <Paragraph>
          FAHASA có thể điều chỉnh Điều Khoản Sử Dụng Dịch Vụ này vào bất kỳ
          thời điểm nào, và đăng tải công khai Điều Khoản Sử Dụng đã được điều
          chỉnh trên website fahasa.com. Việc khách hàng tiếp tục sử dụng dịch
          vụ của FAHASA mà không có bất kỳ khiếu nại nào đối với Chính Sách được
          điều chỉnh sẽ được hiểu rằng khách hàng đã chấp thuận Điều Khoản Sử
          Dụng Dịch Vụ được điều chỉnh đó của FAHASA.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default TermsOfService;
