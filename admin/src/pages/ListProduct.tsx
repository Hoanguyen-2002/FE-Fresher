import {
  Flex,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  Image,
  Button,
  Input,
  Switch,
  Select,
  message,
} from 'antd';
import { formatPrice } from '../utils/priceValidation';
import { useEffect, useState } from 'react';
import { TBook } from '../types/book';
import { getProductsList } from '../api/products';
import {
  EditOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import UpdateProductForm from '../components/form/UpdateProductForm';
import { formatCategory } from '../utils/categoryFormat';
import { TSort } from '../types/search';
import { getCategoryList } from '../api/categories';
import { TCategoryListItem } from '../types/category';
// import { findCategoryIdByName } from '../utils/categoryUtils';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/configureStore';

function ListProduct() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<TBook[]>([]);
  const [editingBookId, setEditingBookId] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');
  const [categories, setCategories] = useState<TCategoryListItem[]>([]);
  const [nameAscending, setNameAscending] = useState<boolean>(true);
  const [priceAscending, setPriceAscending] = useState<boolean>(true);
  const [ratingAscending, setRatingAscending] = useState<boolean>(true);
  const [saleAscending, setSaleAscending] = useState<boolean>(true);
  const [sortParams, setSortParams] = useState<TSort[]>([]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (imageURL: string) => <Image width={100} src={imageURL}></Image>,
    },
    {
      title: 'Đánh giá trung bình',
      dataIndex: 'averageRating',
      key: 'averageRating',
      align: 'center',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (basePrice: number) => <span>{formatPrice(basePrice)}</span>,
    },
    {
      title: 'Giá giảm',
      dataIndex: 'discountPrice',
      key: 'discountPrice',
      render: (discountPrice: number) => (
        <span>{formatPrice(discountPrice)}</span>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'authorName',
      key: 'authorName',
    },
    {
      title: 'Thể loại',
      dataIndex: 'categoryName',
      key: 'categoryName',
      render: (categoryName: string) => (
        <span>{formatCategory(categoryName)}</span>
      ),
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'publisherName',
      key: 'publisherName',
    },
    {
      title: 'Tổng lượt bán',
      dataIndex: 'totalSalesCount',
      key: 'totalSalesCount',
    },
    {
      title: 'Chỉnh Sửa',
      key: 'action',
      align: 'center',
      render: (book: TBook) => {
        const toggleEdit = () => {
          console.log(book.bookId);
          setEditingBookId(book.bookId);
          showEditModal();
        };
        return (
          <span>
            <EditOutlined key='edit' onClick={toggleEdit} />
          </span>
        );
      },
    },
  ];

  const getListProduct = async (category?: string[]) => {
    try {
      setIsLoading(true);
      const response = await getProductsList({
        page: pageIndex,
        size: itemPerPage,
        title: keyword,
        sort: sortParams,
        status: isActive,
        categories: category,
      });
      if (response.msg === 'Success') {
        setBooks(response.books);
        setTotalItems(response.totalItems);
      } else {
        message.error(`Có lỗi xảy ra, vui lòng thử lại`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await getCategoryList();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showEditModal = (): void => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    getListProduct();
  };

  const isSorted = (type: string) => {
    let check = false;
    sortParams?.forEach((item) => {
      if (item.sortType === type) {
        check = true;
      }
    });
    return check;
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number
  ) => {
    console.log(pageSize);
    setItemPerPage(pageSize);
  };

  const removeSortParams = (type: string) => {
    let check = false;
    sortParams?.forEach((item) => {
      if (item.sortType === type) {
        check = true;
      }
    });
    if (check) {
      const newSortParams = sortParams.filter((item) => item.sortType != type);
      setSortParams(newSortParams);
    }
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
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      getListProduct();
    }
  }, [pageIndex, itemPerPage, sortParams, isActive, isModalOpen]);

  return (
    <Flex gap={32} vertical className='px-24 py-8'>
      <Flex vertical className='size-auto'>
        <Flex gap={16} justify='end' align='center'>
          <p>Trạng thái</p>
          <Input
            value={keyword}
            type='text'
            placeholder='Tìm kiếm'
            onPressEnter={handleSearch}
            onChange={(e) => setKeyword(e.target.value)}
            className='w-[300px]'
          />
          <Button
            onClick={handleSearch}
            className='bg-soft-red text-white border-soft-red'
          >
            <SearchOutlined />
          </Button>
        </Flex>
        <Flex justify='start' gap={32} align='center'>
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
      </Flex>
      <h1 className='text-4xl font-bold'>Danh sách sản phẩm</h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={books}
        pagination={false}
      />
      <Pagination
        className='mt-4 flex justify-center'
        defaultCurrent={1}
        total={totalItems}
        showSizeChanger
        onChange={(current) => setPageIndex(current - 1)}
        onShowSizeChange={onShowSizeChange}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Lưu'
        cancelText='Hủy'
        width={1000}
        footer={null}
      >
        <UpdateProductForm
          bookId={editingBookId}
          onFinsh={() => setIsModalOpen(false)}
        />
      </Modal>
    </Flex>
  );
}

export default ListProduct;
