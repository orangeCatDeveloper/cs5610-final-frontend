import React, { useEffect, useState } from 'react';
import { List, Divider, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReviewComponent from '../activity/review';
import CreatedNewsComponent from '../activity/createdNews';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const NewsList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [allNews, setAllNews] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const navigate = useNavigate();
    const fetchNews = () => {
        axios.get(`${BASE_URL}/news`)
            .then(response => {
                setAllNews(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const clickNews = (news) => {
        navigate(`/news-detail/${news._id}`);
    };
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        fetchNews();
        window.addEventListener("resize", handleResize);
        handleResize();
    }, [])


    return (
        <div>

            {user && <h4>Welcome back, {user.username}</h4>}
            {user && user.role === 'user' && <h4>Your lastest reviews:</h4>}
            {user && user.role === 'user' && <ReviewComponent />}
            {user && (user.role === 'admin' || user.role === 'creator') && <h4>News created by you:</h4>}
            {user && (user.role === 'admin' || user.role === 'creator') && <CreatedNewsComponent />}
            <h1><b>Popular news among users</b></h1>
            <Divider />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={allNews}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        onClick={() => clickNews(item)}
                        actions={[]}
                        extra={
                            (windowSize.width > 768) && <img
                                className="d-none d-md-block"
                                style={{ maxWidth: 200 }}
                                alt="logo"
                                src={item.image ? item.image : '/images/banner.png'}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>

    )
}

export default NewsList;