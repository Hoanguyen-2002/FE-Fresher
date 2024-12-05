import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Menu, Form, Input, Select, Button as AntButton, message, Alert } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, KeyOutlined, ProfileOutlined, ShoppingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import Button from '../components/button/Button';
import api from '../api/apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResetPass from './ResetPass';

const { Sider, Content } = Layout;
const { Option } = Select;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'var(--grey)',
    backgroundColor: 'white',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: 'var(--grey)',
    backgroundColor: 'white',
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

type MenuItem = Required<MenuProps>['items'][number];

interface ProfileProps {
    avartar?: string,
    fullName?: string
}

const items: MenuItem[] = [
    {
        key: 'user',
        icon: <UserOutlined />,
        label: 'Thông tin tài khoản',
        children: [
            { key: 'myProfile', icon: <ProfileOutlined />, label: 'Hồ sơ cá nhân' },
            { key: 'changePassword', icon: <KeyOutlined />, label: 'Đổi mật khẩu' },
        ],
    }
];

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

interface Address {
    addressId: string;
    city: string;
    province: string;
    district: string;
    detailAddress: string;
}

interface Profile {
    accountId: string;
    avatar: string;
    email: string;
    fullname: string;
    listAddress: Address[];
    phone: string;
}

const Profile: React.FC = (props: ProfileProps) => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['user', 'myProfile']);
    const [selectedKey, setSelectedKey] = useState<string>('myProfile');
    const [profile, setProfile] = useState<Profile>();
    const [form] = Form.useForm();
    const [backendError, setBackendError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const response = await api.get(`/v1/accounts/myInfo`);
                setProfile(response.data.data.content);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const backendError = error.response.data.msg;
                    console.error("Load profile failed:", backendError);
                    message.error('TẢI HỒ SƠ CÁ NHÂN THẤT BẠI.');
                }
            }
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [profile]);

    const onMenuSelect: MenuProps['onClick'] = (e) => {
        setSelectedKey(e.key);
    }

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    .filter((_, index) => index !== repeatIndex)
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="0">+84</Option>
            </Select>
        </Form.Item>
    );

    const handleFinish = async () => {
        const values = form.getFieldsValue();
        const formatedValues = {
            fullname: values.fullname,
            phone: `${values.prefix}${values.phone}`,
            avatar: 'url_avt',
        };
        console.log(formatedValues)
        try {
            const response = await api.put('/v1/accounts', formatedValues);
            console.log(response.data)
            setBackendError(null);
            message.success(
                "CẬP NHẬT HỒ SƠ THÀNH CÔNG",
                10
            );
            fetchProfile();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendError = error.response.data.msg;
                console.log("Lỗi: " + backendError);
                setBackendError(backendError);
            }
            message.error("CẬP NHẬT HỒ SƠ THẤT BẠI. Vui lòng thử lại!", 10);
        }

    }

    const onReset = () => {
        form.resetFields();
        fetchProfile();
    };

    const renderContent = () => {
        switch (selectedKey) {
            case ('myProfile'): {
                const initialValues = {
                    prefix: '0',
                    username: localStorage.getItem('username'),
                    fullname: profile?.fullname,
                    email: profile?.email,
                    phone: profile?.phone?.substring(1),
                };
                console.log(initialValues);
                return <div className="max-w-screen min-h-28 bg-white pt-10 pb-10 justify-left items-center px-4 sm:px-6 lg:px-8"
                >
                    <div className="container flec-col max-w-screen w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
                        <Form
                            className='bg-[white]'
                            {...formItemLayout}
                            variant='outlined'
                            form={form}
                            initialValues={initialValues}
                        >
                            {backendError && (
                                <Alert
                                    className="mb-6"
                                    message="CẬP NHẬT HỒ SƠ THẤT BẠI"
                                    description={backendError}
                                    type="error"
                                    showIcon
                                />
                            )}
                            <h1 className="text-center mb-6 font-semibold text-lg">
                                HỒ SƠ CÁ NHÂN
                            </h1>
                            <Form.Item
                                label="Tên tài khoản"
                                name="username">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Họ và Tên"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhập Họ và Tên của bạn!",
                                    },
                                    {
                                        pattern: /^.{1,50}$/,
                                        message: "Họ và tên không được vượt quá 50 kí tự.",
                                    },
                                ]}
                            >
                                <Input placeholder='Họ và Tên' />
                            </Form.Item>
                            <Form.Item
                                label="Số Điện Thoại"
                                name="phone"
                                rules={[
                                    { required: true, message: "Nhập số điện thoại của bạn!" },
                                    {
                                        pattern: /^\d{9}$/,
                                        message: "Vui lòng nhập đúng 9 chữ số điện thoại (sau số 0).",
                                    },
                                ]}
                            >
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='Số điện thoại' />
                            </Form.Item>
                            <Form.Item className='text-left pt-3' wrapperCol={{ offset: 6, span: 16 }}>
                                <Button onClick={() => { handleFinish() }} bgColor='var(--soft-red)' borderColor='white' text='Lưu thay đổi' textColor='white' />
                                <AntButton className='h-[50px] rounded-[200px] border-[1px] ml-[10px]'
                                    htmlType="button"
                                    onClick={onReset}>
                                    Hủy
                                </AntButton>
                            </Form.Item>
                        </Form>
                    </div>

                </div >
            }
                ;
            case ('changePassword'):
                return <div className='justify-center'><ResetPass></ResetPass></div>;
        }
    }

    return (
        <main>
            <Layout>
                <Sider width="25%" style={siderStyle}>
                    <div className='container'>
                        <div className='bg-[white] min-h-screen'>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                icon={<UserOutlined />}
                                src={props.avartar}
                            />
                            <h2>{props.fullName}</h2>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['myProfile']}
                                selectedKeys={[selectedKey]}
                                onClick={onMenuSelect}
                                openKeys={stateOpenKeys}
                                onOpenChange={onOpenChange}
                                items={items}
                            />
                        </div>
                    </div>
                </Sider>
                <Content style={contentStyle}>
                    {renderContent()}
                </Content>
            </Layout>

        </main>

    );
};
export default Profile;