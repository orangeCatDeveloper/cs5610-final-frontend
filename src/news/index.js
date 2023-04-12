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
import NewsDetail from "./news-detail";
import TopbarComponent from "./topbar";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import SearchComponent from "./search";
import AdminComponent from "./admin";
import EditProfileComponent from "./profile/edit-profile";
import profileReducer from "./profile/profile-reducer";
import userReducer from "../redux/user-reducer";
import getItem from "../common/util";
import { ROUTE_PATHS } from "../constants/path";
import {
    HomeOutlined, UserOutlined, CalendarOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, SearchOutlined, TeamOutlined
} from '@ant-design/icons';
const store = configureStore(
    { reducer: { profile: profileReducer, currentUser: userReducer } });
const { Header, Sider, Content } = Layout;

const items =
    [
        getItem('Home', ROUTE_PATHS.HOME, <HomeOutlined />),
        getItem('Search', ROUTE_PATHS.SEARCH, <SearchOutlined />),
        getItem('Activities', ROUTE_PATHS.ACTIVITIES, <CalendarOutlined />),
        getItem('Admin', ROUTE_PATHS.ADMIN, <TeamOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Profile', ROUTE_PATHS.PROFILE),
            getItem('Login', ROUTE_PATHS.LOGIN),
        ]),

    ];

function News() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('home');
    const [collapsed, setCollapsed] = useState(false);
    // useEffect(() => {
    //     const mediaQuery = window.matchMedia("(max-width: 768px)");
    //     if (mediaQuery.matches) {
    //         setCollapsed(true);
    //     } else {
    //         setCollapsed(false);
    //     }
    //     const resizeHandler = () => {
    //         if (mediaQuery.matches) {
    //             setCollapsed(true);
    //         } else {
    //             setCollapsed(false);
    //         }
    //     };
    //     window.addEventListener("resize", resizeHandler);
    //     return () => {
    //         window.removeEventListener("resize", resizeHandler);
    //     };
    // }, []);
    useEffect(() => {
        if (
            location.pathname === ROUTE_PATHS.HOME ||
            location.pathname === "/"
        ) {
            setSelectedItem(ROUTE_PATHS.HOME);
        } else if (location.pathname === ROUTE_PATHS.SEARCH) {
            setSelectedItem(ROUTE_PATHS.SEARCH);
        } else {
            //   setSelectedItem("");
            setSelectedItem(location.pathname);
        }
    }, [location.pathname]);

    const onClick = e => {
        setSelectedItem(e.key);
        navigate(e.key);
    };
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
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
                            <Route path={ROUTE_PATHS.PROFILE} element={<ProfileComponent />} />
                            <Route path={ROUTE_PATHS.EDIT_PROFILE} element={<EditProfileComponent />} />
                            <Route path={ROUTE_PATHS.HOME} element={<HomeComponent />} />
                            <Route path={ROUTE_PATHS.SEARCH} element={<SearchComponent />} />
                            <Route path={ROUTE_PATHS.ACTIVITIES} element={<ActivitiesComponent />} />
                            <Route path={ROUTE_PATHS.LOGIN} element={<LoginComponent />} />
                            <Route path={ROUTE_PATHS.SIGNUP} element={<RegisterComponent />} />
                            <Route path={ROUTE_PATHS.ADMIN} element={<AdminComponent />} />
                            <Route
                                path={`news-detail/:id`}
                                element={<NewsDetail />}
                            />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>

        </Provider>
    )

}

export default News;