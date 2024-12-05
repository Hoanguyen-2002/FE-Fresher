import { Flex, Pagination } from "antd";
import BookList from "../components/book/BookList";
import Filter from "../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsList } from "../api/products";
import { updateBookState } from "../store/book/bookSlice";
import { RootState } from "../store/configureStore";
import { TBookListReturn } from "../types/book";
import { BOOK_ITEM_PER_PAGE } from "../types/const";
import LoadingScreen from "../components/loading/LoadingScreen";
import Sort from "../components/sort/Sort";
import { TSort } from "../types/search";
import { useAppSelector } from "../hook/hook";
import SortMobile from "../components/sort/SortMobile";
//import { removeAllFilteredCategory } from "../store/category/categorySlice";

function Books() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    bookList,
    totalItems,
    searchValue,
    currentPage,
    ratingValue,
    maxPrice,
    minPrice,
    sort,
  } = useSelector((state: RootState) => state.bookReducer);

  const filteredCategories = useAppSelector(
    (state: RootState) => state.categoryReducer.filteredCategory
  );

  const isMobile = window.innerWidth <= 640;

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    console.log("toggle");
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    getBookList(
      0,
      searchValue,
      filteredCategories,
      ratingValue,
      maxPrice,
      minPrice,
      sort
    );
  }, [searchValue, filteredCategories, ratingValue, maxPrice, minPrice, sort]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(removeAllFilteredCategory());
  //     dispatch(
  //       updateBookState({
  //         bookList: [],
  //         searchValue: "",
  //         filterCategory: [],
  //         ratingValue: null,
  //         maxPrice: null,
  //         minPrice: null,
  //       })
  //     );
  //   };
  // }, []);

  const getBookList = async (
    pageNum: number,
    searchKey: string,
    category?: string[],
    ratingValue?: number | null,
    maxPrice?: number | null,
    minPrice?: number | null,
    sort?: TSort[]
  ) => {
    try {
      setIsLoading(true);
      const data: TBookListReturn | null = await getProductsList({
        page: pageNum == 0 ? pageNum : pageNum - 1,
        title: searchKey,
        categories: category,
        rating: ratingValue,
        maxPrice: maxPrice,
        minPrice: minPrice,
        sort: sort,
      });
      if (data) {
        dispatch(
          updateBookState({
            bookList: data.books,
            currentPage: pageNum,
            totalItems: data.totalItems,
          })
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const goPage = (pageNum: number) => {
    getBookList(
      pageNum,
      searchValue,
      filteredCategories,
      ratingValue,
      maxPrice,
      minPrice,
      sort
    );
  };

  return (
    <Flex>
      {isMobile ? <Filter isMobile={true} isOpen={isOpen} triggerFilter={toggleSidebar} /> : <Filter isMobile={false} isOpen={false} />}
      <Flex className="w-full" vertical>
        {isMobile ? <SortMobile toggleFilter={toggleSidebar} /> : <Sort />}
        {isLoading ? <LoadingScreen /> : <BookList bookList={bookList} />}
        {bookList && (
          <Pagination
            className="my-8"
            align="center"
            pageSize={BOOK_ITEM_PER_PAGE}
            defaultCurrent={1}
            current={currentPage}
            total={totalItems}
            showSizeChanger={false}
            onChange={(current) => goPage(current)}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default Books;
