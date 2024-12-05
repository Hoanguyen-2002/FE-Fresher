import { Breadcrumb, Flex } from 'antd';
import ImageContainer from '../components/bookDetail/ImageContainer';
import BookInformation from '../components/bookDetail/BookInformation';
import BookReview from '../components/bookDetail/BookReview';
import { useEffect, useState } from 'react';
import { TBookDetail } from '../types/book';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../api/products';
import BookUnavailable from '../components/bookDetail/BookUnavailable';
import LoadingScreen from '../components/loading/LoadingScreen';
import { HomeOutlined } from '@ant-design/icons';

function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<TBookDetail | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentPath = location.pathname;

  const getBookDetail = async () => {
    try {
      setIsLoading(true);
      const response = await getProductDetail(id);
      setBook(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeQuantity = (value: number) => {
    setPurchaseQuantity(value);
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  if (!book && !isLoading) return <BookUnavailable />;

  return (
    <>
      {book && !isLoading ? (
        <>
          <Breadcrumb
            className={'mx-8 py-4 text-[16px] font-medium '}
            separator='>'
            items={[
              {
                title: (
                  <>
                    <HomeOutlined className='!text-[18px]' />
                  </>
                ),
                href: '/',
              },
              { title: 'Sản Phẩm', href: '/books' },
              {
                title: ':id',
                href: '/book/' + currentPath.split('/')[2],
                className: '!text-red ',
              },
            ]}
            params={{ id: book.title }}
          />
          <Flex vertical className='px-4 md:px-24 py-8'>
            <Flex className='justify-center w-full flex-col md:flex-row'>
              <ImageContainer
                book={book}
                thumbnailUrl={book.thumbnail}
                imageUrls={book.images ?? []}
                purchaseQuantity={purchaseQuantity}
              />
              <BookInformation
                bookInformation={book}
                purchaseQuantity={purchaseQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </Flex>
            <BookReview />
          </Flex>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default BookDetail;
