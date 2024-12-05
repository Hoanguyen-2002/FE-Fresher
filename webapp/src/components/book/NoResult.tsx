import { Flex } from 'antd';

const NoResult = () => {
  return (
    <Flex
      vertical
      gap={32}
      className='w-full min-h-screen items-center justify-center'
    >
      <img src='https://cdni.iconscout.com/illustration/premium/thumb/file-not-found-4064359-3363920.png'></img>
      <p>Không có sản phẩm nào</p>
    </Flex>
  );
};

export default NoResult;
