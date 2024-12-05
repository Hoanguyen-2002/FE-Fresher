import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { updateBookState } from '../../store/book/bookSlice';
import { TSort } from '../../types/search';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { CategoryTag } from '../category/CategoryTag';
import { formatCategory } from '../../utils/formatText';
import { findCategoryNameById } from '../../utils/categoryUtils';

const Sort = () => {
  const [nameAscending, setNameAscending] = useState<boolean>(true);
  const [priceAscending, setPriceAscending] = useState<boolean>(true);
  const [ratingAscending, setRatingAscending] = useState<boolean>(true);
  const [saleAscending, setSaleAscending] = useState<boolean>(true);
  const [sortParams, setSortParams] = useState<TSort[]>([]);

  const { searchValue, sort } = useSelector(
    (state: RootState) => state.bookReducer
  );

  const { categoryList, filteredCategory } = useAppSelector(
    (state: RootState) => state.categoryReducer
  );

  const dispatch = useAppDispatch();

  const handleSort = () => {
    dispatch(
      updateBookState({
        sort: sortParams,
      })
    );
  };

  const removeSortParams = (type: string) => {
    let check = false;
    sort?.forEach((item) => {
      if (item.sortType === type) {
        check = true;
      }
    });
    if (check) {
      const newSortParams = sortParams.filter((item) => item.sortType != type);
      setSortParams(newSortParams);
    }
  };

  const isSorted = (type: string) => {
    let check = false;
    sort?.forEach((item) => {
      if (item.sortType === type) {
        check = true;
      }
    });
    return check;
  };

  const updateSortParams = (type: string, isAdd: boolean) => {
    switch (type) {
      case 'title':
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: !nameAscending ? 'asc' : 'desc' },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case 'sellingPrice':
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: !priceAscending ? 'asc' : 'desc' },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case 'averageRating':
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: !ratingAscending ? 'asc' : 'desc' },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
      case 'totalSalesCount':
        if (isAdd) {
          removeSortParams(type);
          setSortParams((prevItems) => [
            ...prevItems,
            { sortType: type, order: !saleAscending ? 'asc' : 'desc' },
          ]);
        } else {
          removeSortParams(type);
        }
        break;
    }
  };

  useEffect(() => {
    handleSort();

    return () => {
      dispatch(
        updateBookState({
          sort: [],
        })
      );
    };
  }, [sortParams]);

  return (
    <Flex gap={8} className='w-full shadow-md px-8 py-4' vertical>
      <Flex gap={32}>
        <p className='font-bold'>Sắp xếp</p>
        <Flex gap={8}>
          Theo tên:
          <div
            className={`cursor-pointer ${
              isSorted('title') ? 'text-soft-red font-bold' : ''
            }`}
            onClick={() => {
              setNameAscending(!nameAscending);
              updateSortParams('title', true);
            }}
          >
            {nameAscending ? (
              <div>
                A - Z
                <SortAscendingOutlined />
              </div>
            ) : (
              <div>
                Z - A
                <SortDescendingOutlined />
              </div>
            )}
          </div>
          <div
            className={`size-6 bg-soft-red text-white text-center rounded-md cursor-pointer ${
              isSorted('title') ? 'block' : 'hidden'
            }`}
            onClick={() => updateSortParams('title', false)}
          >
            X
          </div>
        </Flex>
        <Flex gap={8}>
          Theo giá:
          <div
            className={`cursor-pointer ${
              isSorted('sellingPrice') ? 'text-soft-red font-bold' : ''
            }`}
            onClick={() => {
              setPriceAscending(!priceAscending);
              updateSortParams('sellingPrice', true);
            }}
          >
            {priceAscending ? (
              <div>
                Tăng dần
                <SortAscendingOutlined />
              </div>
            ) : (
              <div>
                Giảm dần
                <SortDescendingOutlined />
              </div>
            )}
          </div>
          <div
            className={`size-6 bg-soft-red text-white text-center rounded-md cursor-pointer ${
              isSorted('sellingPrice') ? 'block' : 'hidden'
            }`}
            onClick={() => updateSortParams('sellingPrice', false)}
          >
            X
          </div>
        </Flex>
        <Flex gap={8}>
          Theo đánh giá:
          <div
            className={`cursor-pointer ${
              isSorted('averageRating') ? 'text-soft-red font-bold' : ''
            }`}
            onClick={() => {
              setRatingAscending(!ratingAscending);
              updateSortParams('averageRating', true);
            }}
          >
            {ratingAscending ? (
              <div>
                Tăng dần
                <SortAscendingOutlined />
              </div>
            ) : (
              <div>
                Giảm dần
                <SortDescendingOutlined />
              </div>
            )}
          </div>
          <div
            className={`size-6 bg-soft-red text-white text-center rounded-md cursor-pointer ${
              isSorted('averageRating') ? 'block' : 'hidden'
            }`}
            onClick={() => updateSortParams('averageRating', false)}
          >
            X
          </div>
        </Flex>
        <Flex gap={8}>
          Theo lượt bán:
          <div
            className={`cursor-pointer ${
              isSorted('totalSalesCount') ? 'text-soft-red font-bold' : ''
            }`}
            onClick={() => {
              setSaleAscending(!saleAscending);
              updateSortParams('totalSalesCount', true);
            }}
          >
            {saleAscending ? (
              <div>
                Tăng dần
                <SortAscendingOutlined />
              </div>
            ) : (
              <div>
                Giảm dần
                <SortDescendingOutlined />
              </div>
            )}
          </div>
          <div
            className={`size-6 bg-soft-red text-white text-center rounded-md cursor-pointer ${
              isSorted('totalSalesCount') ? 'block' : 'hidden'
            }`}
            onClick={() => updateSortParams('totalSalesCount', false)}
          >
            X
          </div>
        </Flex>
      </Flex>
      <Flex gap={32} className='flex-col lg:flex-row'>
        {searchValue !== '' && (
          <p className='text-center'>
            Hiển thị kết quả tìm kiếm cho:{' '}
            <span className='text-4xl text-soft-red '>"{searchValue}"</span>
          </p>
        )}
        <Flex className='items-center gap-4'>
          <p>Thể loại</p>
          {filteredCategory?.map((category, index) => (
            <CategoryTag
              key={index}
              tagName={formatCategory(
                findCategoryNameById(category, categoryList)
              )}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sort;
