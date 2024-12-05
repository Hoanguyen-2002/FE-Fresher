import { Dropdown, Flex, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../api/apiConfig';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');
  const refreshToken = localStorage.getItem('refreshToken');

  const items: MenuProps['items'] = [];

  const handleLogout = async () => {
    try {
      if (accessToken && refreshToken && username) {
        console.log('logout');
        await api.post('/v1/auth/logout', { refreshToken: refreshToken });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
  };

  if (accessToken) {
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
        label: <a href='/profile'>Hồ sơ cá nhân</a>,
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

  return (
    <Flex
      className='py-4 px-8 w-full h-17 bg-soft-red justify-between'
      align='center'
    >
      <img
        className='w-[220px] cursor-pointer'
        alt='logo'
        src={logo}
        onClick={() => navigate('/')}
      ></img>
      <Flex gap={24}>
        <h1 className='text-white text-2xl'>Admin</h1>
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

export default Header;
