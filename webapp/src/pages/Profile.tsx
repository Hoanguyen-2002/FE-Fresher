import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import { KeyOutlined, MenuOutlined, ProfileOutlined, ShoppingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    color: 'var(--grey)',
    // backgroundColor: 'white',
    backgroundColor: '#eeeeee',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: 'var(--grey)',
    backgroundColor: 'white',
};

type MenuItem = Required<MenuProps>['items'][number];

interface ProfileProps {
    avartar?: string,
    username?: string
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
    },
    {
        key: 'myOrders',
        icon: <ShoppingOutlined />,
        label: 'Đơn hàng của tôi',
    },
    // {
    //     key: 'notifications',
    //     icon: <BellOutlined />,
    //     label: 'Thông báo',
    // },
    // {
    //     key: 'myReviews',
    //     icon: <StarOutlined />,
    //     label: 'Đánh giá của tôi',
    // }
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

const Profile: React.FC = (props: ProfileProps) => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['user', 'myProfile']);
    const [selectedKey, setSelectedKey] = useState<string>('myProfile');
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const detail = pathSegments[pathSegments.length - 1];
    const username = localStorage.getItem('username')

    useEffect(() => {
        setSelectedKey(detail);
    }, []);

    const onMenuSelect: MenuProps['onClick'] = (e) => {
        setSelectedKey(e.key);
        navigate(`/profile/${e.key}`);
        setIsSiderVisible(false);
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

    const [isSiderVisible, setIsSiderVisible] = useState(false);

    return (
        <main>
            <Layout>
                <div className="lg:hidden bg-gray-100 px-4 py-2 flex items-center">
                    <button
                        className="fixed top-32 left-4 z-50 lg:hidden bg-soft-red text-white p-2 rounded-full shadow-md"
                        onClick={() => setIsSiderVisible(true)}
                    >
                        <MenuOutlined />
                    </button>
                </div>
                <Sider width="20%" style={siderStyle} breakpoint="lg"
                    collapsedWidth="0"
                    className="hidden lg:block" >
                    <div className='container'>
                        <div className='bg-[white] min-h-screen'>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                icon={<UserOutlined />}
                                src={props.avartar}
                                className='mt-3'
                            />
                            <h2 className="text-center lg:text-center m-3">{username}</h2>
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
                <Drawer
                    title="Menu"
                    placement="left"
                    closable={true}
                    onClose={() => setIsSiderVisible(false)}
                    open={isSiderVisible}
                    bodyStyle={{ padding: 0 }}
                >
                    <div className="container">
                        <div className="bg-white min-h-screen flex flex-col items-center lg:items-start lg:pl-4">
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                icon={<UserOutlined />}
                                src={props.avartar}
                            />
                            <h2 className="text-center lg:text-left mt-2">{username}</h2>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['myProfile']}
                                selectedKeys={[selectedKey]}
                                onClick={onMenuSelect}
                                openKeys={stateOpenKeys}
                                onOpenChange={onOpenChange}
                                items={items}
                                className="w-full"
                            />
                        </div>
                    </div>
                </Drawer>
                <Content style={contentStyle} className="p-4 transition-all">
                    {/* {renderContent()} */}
                    <Outlet />
                </Content>
            </Layout>

        </main>

    );
};
export default Profile;