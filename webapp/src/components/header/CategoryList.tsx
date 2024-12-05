import { Flex } from 'antd';
import { useEffect } from 'react';
import { getCategoryList } from '../../api/categories';
import { DownCircleOutlined } from '@ant-design/icons';
import { formatCategory } from '../../utils/formatText';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addFilteredCategories,
  updateCategoryState,
} from '../../store/category/categorySlice';
import { useAppSelector } from '../../hook/hook';
import { RootState } from '../../store/configureStore';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryList, filteredCategory } = useAppSelector(
    (state: RootState) => state.categoryReducer
  );

  const getCategories = async () => {
    try {
      const response = await getCategoryList();
      if (response) {
        dispatch(
          updateCategoryState({
            categoryList: response,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleSelectCategory = (id: string) => {
    console.log(filteredCategory.includes(id));
    dispatch(addFilteredCategories(id));
    navigate('/books');
  };

  return (
    <Flex vertical gap={8} className='px-2 py-4 w-auto'>
      <h1 className='text-2xl font-bold'>Danh mục sản phẩm</h1>
      <Flex vertical className='px-2 py-4 bg-white' wrap>
        {categoryList.map((category) => (
          <p
            key={category.categoryId}
            className='cursor-pointer text-xl hover:text-soft-red uppercase'
            onClick={() => handleSelectCategory(category.categoryId)}
          >
            {formatCategory(category.name)}
          </p>
        ))}
      </Flex>
      <p
        className='w-full text-center cursor-pointer text-blue hover:font-bold'
        onClick={() => navigate('/books')}
      >
        Xem thêm <DownCircleOutlined />
      </p>
    </Flex>
  );
};

export default CategoryList;
