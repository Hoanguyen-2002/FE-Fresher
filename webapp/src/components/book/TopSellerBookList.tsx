import { useEffect, useState } from "react";
import { TBookListReturn, TBook } from "../../types/book";
import { getTopSellerProductsList } from "../../api/products";
import BookCard from "./BookCard";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
// Nếu sử dụng file JavaScript/TypeScript:
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateBookState } from "../../store/book/bookSlice";

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TopSellerBookList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [topSellers, setTopSellers] = useState<TBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTopSeller();
  }, []);

  const getTopSeller = async () => {
    try {
      const data: TBookListReturn | null = await getTopSellerProductsList();
      if (data) setTopSellers(data.books);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[30vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  return (
    <div className="top-seller-bg xl:max-w-[1240px] mx-auto flex flex-col gap-4">
      <div className="w-full bg-white xl:rounded-lg overflow-hidden p-4 flex justify-between">
        <span className="font-black uppercase text-2xl text-red italic">
          Best <span className="text-[#FFD700] text-3xl">S</span>eller
        </span>
        <div
          onClick={() => {
            dispatch(
              updateBookState({
                bookList: [],
                currentPage: 1,
                totalItems: 1,
                searchValue: "",
                filterCategory: [],
                ratingValue: null,
                maxPrice: null,
                minPrice: null,
              })
            );
            navigate("/books");
          }}
          className="flex justify-center text-soft-red bg-white border-2 text-inherit no-underline border-soft-red text-sm font-bold items-center rounded-lg max-w-[100%] max-h-[100%] h-10 w-[100px] cursor-pointer"
        >
          Xem tất cả
        </div>
      </div>
      <Slider {...settings}>
        {topSellers.map((book, index) => (
          <div key={index} className="w-full !flex !justify-center">
            <BookCard
              key={book.bookId}
              book_image={book.thumbnail}
              book_title={book.title}
              category={book.categoryName}
              author={book.authorName}
              original_price={book.basePrice}
              sale_price={book.basePrice - book.discountPrice}
              ratings={book.averageRating}
              total_reviews={book.totalSalesCount}
              onClick={() => {
                navigate(`/book/${book.bookId}`);
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopSellerBookList;
