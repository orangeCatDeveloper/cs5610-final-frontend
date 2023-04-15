import React, { useEffect, useState } from 'react';
import { Input, List, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Bookmark = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [myBookmark, setMyBookmark] = useState([]);
    const navigate = useNavigate();

    const getBookmarkNews = () => {
        axios.get(`${BASE_URL}/user/${user._id}/bookmark`)
        .then(response => {
            setMyBookmark(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    const clickNews = (news) => {
        axios.post(`${BASE_URL}/save`, news)
            .then(response => {
                const newsId = response.data._id;
                navigate(`/news-detail/${newsId}`);
            })
            .catch(error => {
                console.log(`Open news error`);
            });
    };

    useEffect(() => {
        // console.log(user._id);
        getBookmarkNews();
        
    })
    return(
        <div>
            <h4>Bookmark</h4>
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
                dataSource={myBookmark}
                renderItem={(item) => (
                    <List.Item
                        key={item.newsID.url}
                        onClick={() => clickNews(item.newsID)}
                        actions={[]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={item.newsID.image}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={item.newsID.title}
                            description={item.newsID.description}
                        />
                        {item.newsID.content}
                    </List.Item>
                )}
            />
        </div>
        
    )
}

export default Bookmark;