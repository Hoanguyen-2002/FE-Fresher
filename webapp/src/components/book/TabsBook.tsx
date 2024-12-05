import { useEffect, useState } from "react";
import { getProductsList } from "../../api/products";
import { TBook, TBookListReturn } from "../../types/book";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCard from "./BookCard";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const tabsData = [
  {
    id: 0,
    label: "Đánh giá tích cực nhất",
    content: "This is the content of Tab 1.",
    search: {
      page: 0,
      size: 12,
      sort: [{ sortType: "averageRating", order: "desc" as const }],
    },
  },
  {
    id: 1,
    label: "Giá tốt nhất",
    content: "This is the content of Tab 2.",
    search: {
      page: 0,
      size: 12,
      sort: [{ sortType: "sellingPrice", order: "asc" as const }],
    },
  },
  {
    id: 2,
    label: "Bán chạy nhất",
    content: "This is the content of Tab 3.",
    search: {
      page: 0,
      size: 12,
      sort: [{ sortType: "totalSalesCount", order: "desc" as const }],
    },
  },
];

const TabBook = () => {
  const [activeTab, setActiveTab] = useState<number>(tabsData[0]?.id || 0);
  const [content, setContent] = useState<TBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const tab = tabsData.find((t) => t.id === activeTab);
      if (tab) {
        setIsLoading(true);
        const data: TBookListReturn | null = await getProductsList(tab.search);
        if (data) {
          setContent(data.books);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );

  return (
    <div className="w-full ">
      {/* Tabs Header */}
      <div className="">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-2 px-4 font-semibold text-sm ${
              activeTab === tab.id
                ? "text-[rgb(201,33,39)] border-b-2 border-[rgb(201,33,39)]"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-gray-100 grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1 items-center rounded-b-md">
        {content.map((book) => (
          <div key={book.bookId} className="w-full flex justify-center">
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
      </div>
    </div>
  );
};

export default TabBook;
