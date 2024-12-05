import { Flex, Spin } from 'antd';

const LoadingScreen = () => {
    return (
        <Flex justify='center' align='center' className='relative min-h-96 w-full'>
            <Spin className='mx-auto my-auto' tip='Đang tải'></Spin>
        </Flex>
    );
};

export default LoadingScreen;
