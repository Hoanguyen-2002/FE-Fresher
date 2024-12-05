import { Badge, Dropdown, Flex, MenuProps, message, Popover } from 'antd';
import Search from '../search/Search';
import {
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/apiConfig';
import { useDispatch } from 'react-redux';
import { updateBookState } from '../../store/book/bookSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import CategoryList from './CategoryList';
import logo from '../../assets/logo.svg';

const HeaderContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBookListPage = location.pathname === '/books';
  const { cartItem } = useSelector((state: RootState) => state.cartReducer);
  const { searchValue } = useSelector((state: RootState) => state.bookReducer);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [];

  const handleSearch = (value: string) => {
    dispatch(
      updateBookState({
        searchValue: value,
      })
    );
    // If user search in home page, navigate to book list page
    if (!isBookListPage) {
      navigate('/books');
    }
  };

  if (accessToken && refreshToken && username && userId) {
    items.push(
      {
        key: 'user',
        label: username,
        disabled: true,
      },
      {
        type: 'divider',
      },
      {
        key: 'myProfile',
        label: <a href='/profile/myProfile'>Hồ sơ cá nhân</a>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: <a onClick={handleLogout}>Đăng xuất</a>,
      }
    );
  } else {
    items.push(
      {
        key: 'login',
        label: <a href='/login'>Đăng nhập</a>,
      },
      {
        key: 'register',
        label: <a href='/register'>Đăng ký</a>,
      }
    );
  }

  async function handleLogout(): Promise<void> {
    try {
      if (accessToken && refreshToken && username && userId) {
        await api.post('/v1/auth/logout', { refreshToken: refreshToken });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('addressList');
        message.success(
          'Bạn đã đăng xuất. Vui lòng đăng nhập để tiếp tục mua hàng.',
          10
        );
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('addressList');
      window.location.href = '/login';
    }
  }

  return (
    <Flex
      className='py-4 px-4 md:px-8 w-full h-17 flex-col md:flex-row bg-soft-red'
      align='center'
      gap={16}
    >
      <img
        className='w-[220px] cursor-pointer'
        alt='logo'
        src={logo}
        onClick={() => navigate('/')}
      ></img>
      <Flex className='w-full' align='center'>
        <Popover
          trigger='click'
          content={<CategoryList />}
          placement='bottomLeft'
        >
          <Flex
            vertical
            align='center'
            className='text-white text-center hover:bg-red cursor-pointer rounded-xl p-2 order-2 md:order-1'
          >
            <MenuUnfoldOutlined />
            <p className='text-xs hidden md:block'>Danh mục</p>
          </Flex>
        </Popover>
        <Search
          placeholder='Tìm kiếm sản phẩm'
          defaultValue={searchValue}
          onSearch={handleSearch}
        />
        <Flex
          vertical
          align='center'
          className='text-white text-center hover:bg-red cursor-pointer rounded-xl p-2'
          onClick={() => navigate('/cart')}
        >
          <Badge count={cartItem.length}>
            <ShoppingCartOutlined className='text-white' />
          </Badge>
        </Flex>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Flex
              vertical
              align='center'
              className='text-white text-center hover:bg-red cursor-pointer rounded-xl p-2'
            >
              <UserOutlined />
            </Flex>
          </a>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default HeaderContent;
