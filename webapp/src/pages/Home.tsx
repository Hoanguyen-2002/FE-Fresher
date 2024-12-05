import MainBanner from "../components/banner/MainBanner";
import TabBookList from "../components/book/TabBookList";
import TopSellerBookList from "../components/book/TopSellerBookList";
import CategoryList from "../components/category/CategoryList";
function Home() {

  const trendData = {
    title: "Xu Hướng Mua Sắm",
  }

  return (
    <div className="py-8 bg-[#f8f6f0]">
      <div className="main-banner xl:max-w-[1240px]  m-auto">
        <MainBanner></MainBanner>
      </div>

      <div className="top-seller-container h-auto !bg-[url('../../src/assets/flash_sale_background_image.jpg')] bg-cover bg-center py-6 mt-4">
        <TopSellerBookList></TopSellerBookList>
      </div>

      <div className="category-list mt-5 pt-5">
        <div className="xl:max-w-[1240px] mx-auto">
          <CategoryList></CategoryList>
        </div>
      </div>

      <div className="trend h-auto py-6 mt-4">
        <TabBookList data={trendData}></TabBookList>
      </div>
    </div>
  );
}
export default Home;
