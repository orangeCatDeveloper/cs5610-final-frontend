import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import { configureStore }
    from "@reduxjs/toolkit";
import { Layout, Menu, theme } from "antd";
import { Provider } from "react-redux";
import NavigationSidebar from "./navigation-sidebar";
import HomeComponent from "./home";
import ProfileComponent from "./profile";
import ActivitiesComponent from "./activity";
import TopbarComponent from "./topbar";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import SearchComponent from "./search";
import EditProfileComponent from "./profile/edit-profile";
import profileReducer from "./profile/profile-reducer";
import userReducer from "../redux/user-reducer";
import getItem from "../common/util";
import {
    HomeOutlined, UserOutlined, CalendarOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, SearchOutlined
} from '@ant-design/icons';
const store = configureStore(
    { reducer: { profile: profileReducer, user: userReducer } });
const { Header, Sider, Content } = Layout;

const items =
    [
        getItem('Home', '/home', <HomeOutlined />),
        getItem('Search', '/search', <SearchOutlined />),
        getItem('Activities', '/activities', <CalendarOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Profile', '/profile'),
            getItem('Login', '/login'),
        ]),

    ];

function News() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('home');
    const [collapsed, setCollapsed] = useState(false);
    const onClick = e => {
        setSelectedItem(e.key);
        navigate(e.key);
    };
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
        // <Provider store={store}>
        //     <div>
        //     <TopbarComponent/>
        //     <div style={{
        //         display: "flex", flexDirection: "row"
        //     }}>
        //     <NavigationSidebar/>


        //     <div className="" >
        //         <Routes>
        // <Route path="profile"    element={<ProfileComponent/>}/>
        // <Route path="edit-profile" element={<EditProfileComponent/>}/>
        // <Route path="home"    element={<HomeComponent/>}/>
        // <Route path="activities"    element={<ActivitiesComponent/>}/>
        // <Route path="login"    element={<LoginComponent/>}/>
        // <Route path="signup"    element={<RegisterComponent/>}/>
        //         </Routes>
        //     </div>
        //     </div>

        //     </div>
        // </Provider>
        <Provider store={store}>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[selectedItem]}
                        theme="dark"
                        mode="inline"
                        items={items}
                        style={{ marginTop: 8 }}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{ padding: 0, paddingLeft: 30, background: colorBgContainer }}
                    >
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: () => setCollapsed(!collapsed)
                            }
                        )}
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer
                        }}
                    >
                        <Routes>
                            <Route path="profile" element={<ProfileComponent />} />
                            <Route path="edit-profile" element={<EditProfileComponent />} />
                            <Route path="home" element={<HomeComponent />} />
                            <Route path="search" element={<SearchComponent />} />
                            <Route path="activities" element={<ActivitiesComponent />} />
                            <Route path="login" element={<LoginComponent />} />
                            <Route path="signup" element={<RegisterComponent />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>

        </Provider>
    )

}

export default News;