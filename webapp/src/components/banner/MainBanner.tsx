import { Row } from "antd/lib";
import CarouselItems from "./CarouselItems";
import { Col } from "antd/lib";

const MainBanner = () => {
  const images = [
    "https://cdn0.fahasa.com/media/magentothem/banner7/TrangCTT2511_Mainbanner_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/denban1124_Silde_840X320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/Blingbox_banner_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/tranglego_slide_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/Diamond_1124_BGV_Resize_Slide_840x320_fix.jpg",
  ];

  const imageBanners = [
    {
      id: 1,
      url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/TrangCTT11_1124_20_11_Resize_310X210_2.png",
    },
    {
      id: 2,
      url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/TrangGiangSinh_SmallBanner_T12_310x210.jpg",
    },
    {
      id: 3,
      url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/Trang20_11_SmallBanner_T11_310x210_3.jpg",
    },
    {
      id: 4,
      url: "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/SmallBanner_T11_Alphabooks_smallbanner_310x210.jpg",
    },
  ];

  return (
    <div className="w-[100%] flex flex-col">
      <div className="main-banner">
        <Row justify="center" align="top" gutter={8}>
          <Col xs={{ span: 24 }} lg={{ span: 16 }}>
            <CarouselItems items={images} />
          </Col>
          <Col xs={{ span: 0 }} lg={{ span: 8 }}>
            <Row gutter={[0, 6]}>
              <Col span={24}>
                <div className="h-[157px] w-full bg-[url('https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/VNPAYT11_392x156_1.png')] bg-cover bg-center"></div>
              </Col>
              <Col span={24}>
                <div className="h-[157px] w-full bg-[url('https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2024/BannerSacombank_T10_392x156_07.jpg')] bg-cover bg-center"></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="image-banner-container pt-3 m-auto">
        <Row
          justify="center"
          align="top"
          gutter={{ xs: 0, lg: 10 }}
          style={{ rowGap: "10px" }}
        >
          {imageBanners.map((item) => (
            <Col xs={{ span: 0 }} lg={{ span: 6 }} key={item.id}>
              <div className={`h-[210px] w-full`}>
                <img src={item.url} className="rounded-md" alt="" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MainBanner;
