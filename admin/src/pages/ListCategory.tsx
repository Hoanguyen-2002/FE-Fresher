import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Pagination, Input, message } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { TCategoryListItem } from '../types/category';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../store/category/category';
import api from '../api/apiConfig';

interface Category {
  category_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface searchParams {
  totalItem: number;
  currentPage: number;
  searchKey: string;
}

interface TableBaseProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const TableBase: React.FC<TableBaseProps> = ({ categories }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Tên danh mục sách',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thời gian tạo',
      key: 'created_at',
      render: (_: any, record: any) => {
        return <>{new Date(record.createdAt).toLocaleDateString()}</>;
      },
    },
    {
      title: 'Thời gian cập nhật',
      key: 'updated_at',
      render: (_: any, record: any) => {
        return <>{new Date(record.updatedAt).toLocaleDateString()}</>;
      },
    },
    {
      title: 'Chỉnh Sửa',
      key: 'action',
      render: (category: TCategoryListItem) => {
        const handleCategory = () => {
          dispatch(
            updateCategory({
              categoryId: category.categoryId,
              name: category.name,
              createdAt: category.createdAt,
              updatedAt: category.updatedAt,
              createdBy: '',
              updatedBy: '',
            })
          );
        };
        return (
          <span>
            <Link to='/admin/editCategory' onClick={handleCategory}>
              <EditOutlined key='edit' />
            </Link>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={false}
        rowKey={'id'}
      />
    </>
  );
};

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useState<searchParams>({
    totalItem: 10,
    currentPage: 1,
    searchKey: '',
  });

  const [search, setSearch] = useState<string>('');

  const handleSearch = async () => {
    fetchCategories(1, search);
  };

  const fetchCategories = async (pageNo: number, searchValue?: string) => {
    const searchKey = searchValue ? searchValue : searchParams.searchKey;

    try {
      const response = await api.get(
        `/v1/admin/categories?pageNo=${pageNo}&pageSize=10`
      );
      setCategories(response.data.data.content);

      if (searchValue == '' || searchValue == undefined) {
        const response = await api.get(
          `/v1/admin/categories?pageNo=${pageNo}&pageSize=10`
        );
        setCategories(response.data.data.content);
        setSearchParams({
          totalItem: response.data.data.metadata.totalElements,
          currentPage: pageNo,
          searchKey: searchKey,
        });
      } else {
        const url = searchKey
          ? `v1/admin/categories/search?keyword=${searchKey}&pageNo=${pageNo}&pageSize=10`
          : `v1/admin/categories?pageNo=${pageNo}&pageSize=10`;
        const response = await api.get(url);
        setCategories(response.data.data.content);
        setSearchParams({
          totalItem: response.data.data.metadata.totalElements,
          currentPage: pageNo,
          searchKey: searchKey,
        });
      }
    } catch (error) {
      console.error('Error fetch data:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleChangePage = (page: number) => {
    fetchCategories(page);
  };

  useEffect(() => {
    fetchCategories(1);
  }, []);

  return (
    <>
      <Row justify='end'>
        <Col pull={1}>
          <Row>
            <Col pull={1}>
              <Input
                onPressEnter={handleSearch}
                value={search}
                type='text'
                placeholder='Tìm kiếm'
                maxLength={50}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                onClick={handleSearch}
                className='bg-soft-red text-white border-soft-red'
              >
                <SearchOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={22}>
          <TableBase categories={categories} setCategories={setCategories} />
        </Col>
      </Row>
      <Pagination
        className='mt-4 flex justify-center'
        current={searchParams.currentPage}
        total={searchParams.totalItem}
        pageSize={10}
        onChange={handleChangePage}
      />
    </>
  );
};

export default CategoryList;
