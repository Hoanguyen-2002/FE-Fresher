import BookCard from "./BookCard";
import { TBook } from "../../types/book";
import { useNavigate } from "react-router-dom";
import NoResult from "./NoResult";

interface IBookListProps {
  bookList: TBook[] | undefined
}

const BookList = (props: IBookListProps) => {

  const navigate = useNavigate()

  if (!props.bookList || props.bookList.length === 0) {
    return <NoResult />
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1920px]:grid-cols-6  min-[3840px]:grid-cols-12 gap-6 w-full px-4 py-8">
      {props.bookList.map((book) => (
        <div key={book.bookId} className="flex items-center justify-center h-full">
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
  );
};

export default BookList;
