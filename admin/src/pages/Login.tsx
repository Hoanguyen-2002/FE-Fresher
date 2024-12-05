import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Flex, message, Alert } from 'antd';
import Button from '../components/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { login } from '../api/authorization/login';
import api from '../api/apiConfig';
//import { useAppDispatch } from '../hook/hook';
//import { setUser } from '../store/user/userSlice';

const Login: React.FC = () => {
    const [backendError, setBackendError] = useState<string | null>(null);
    const navigate = useNavigate();
    //const dispatch = useAppDispatch();
    const isAuthenticated = !!localStorage.getItem('accessToken');

    useEffect(() => {
        if (isAuthenticated) {
            console.log('login page:', isAuthenticated)
            message.success('ĐĂNG NHẬP THÀNH CÔNG');
            navigate('/admin');
        }

    }, [isAuthenticated, navigate])

    const onFinish = async (values: { username: string; password: string }) => {
        console.log("Received values of login form: ", values);
        try {
            const response = await api.post('/v1/auth/login', values);
            if (response) {
                if (response.data.data.content.role === "ADMIN") {
                    localStorage.setItem('accessToken', response.data.data.content.accessToken);
                    localStorage.setItem('refreshToken', response.data.data.content.refreshToken);
                    localStorage.setItem('userId', response.data.data.content.userId);
                    localStorage.setItem('username', response.data.data.content.username);
                    setBackendError(null);
                    message.success("ĐĂNG NHẬP THÀNH CÔNG");
                    navigate('/admin', { replace: true });
                } else {
                    setBackendError("Bạn không có quyền truy cập trang này!");
                }
            } else if (response === null) {
                message.error("ĐĂNG NHẬP THẤT BẠI.");
                setBackendError('Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendError = error.response.data.msg;
                console.error("Login error:", backendError);
                message.error("ĐĂNG NHẬP THẤT BẠI.");
                setBackendError(backendError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
            }
        }
    };
    return (
        <main className="min-h-screen bg-soft-red pt-10 pb-10 justify-center flex items-center px-4 sm:px-6 lg:px-8">
            <div className="container max-w-md bg-white shadow-lg rounded-lg w-full lg:max-w-lg p-8">
                <h2 className="text-center font-semibold text-lg pb-3">ĐĂNG NHẬP</h2>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    // className='justify-center border-[1px] rounded-lg border-grey p-7'
                    style={{ maxWidth: 450, padding: 20, justifyContent: "center" }}
                    onFinish={onFinish}
                >
                    {backendError && (
                        <Alert
                            className="mb-6"
                            message="ĐĂNG NHẬP THẤT BẠI"
                            description={backendError}
                            type="error"
                            showIcon
                        />
                    )}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoản của bạn!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item
                                // name="remember"
                                // valuePropName="checked"
                                noStyle
                            >
                                <Checkbox className="">Ghi nhớ tôi</Checkbox>
                            </Form.Item>
                            <a href="/forgotPass" className="text-soft-red font-semibold">
                                Quên mật khẩu
                            </a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <div className="text-center">
                            <Button
                                bgColor="var(--soft-red)"
                                textColor="white"
                                text="ĐĂNG NHẬP"
                                onClick={() => { }}
                            ></Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
};
export default Login;
