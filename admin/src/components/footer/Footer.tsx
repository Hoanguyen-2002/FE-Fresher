import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Flex
      gap={32}
      className='bg-white rounded-2xl w-3/5 mx-auto px-8 py-4 my-4'
    >
      <Flex vertical className='border-r-[1px] border-r-grey w-1/3'>
        <img
          className='w-[220px] cursor-pointer'
          alt='logo'
          src={logo}
          onClick={() => navigate('/')}
        ></img>
      </Flex>
      <h1 className='text-2xl text-black-1'>Trang quản lý</h1>
    </Flex>
  );
};

export default Footer;
