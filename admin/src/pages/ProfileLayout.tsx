import { Layout } from 'antd';
import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Profile from './Profile';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    backgroundColor: 'var(--soft-red)',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'var(--soft-red)',
    minHeight: 100,
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
};

const ProfileLayout: React.FC = () => {
    return (
        <div>
            <Layout style={layoutStyle}>
                <div style={headerStyle}>
                    <Header></Header>
                </div>
                <Layout>
                    <Profile />
                </Layout>
                <div style={footerStyle}>
                    <Footer></Footer>
                </div>
            </Layout>
        </div>
    )
}
export default ProfileLayout;