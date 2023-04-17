import React, { useEffect, useState } from 'react';
import { Input, List, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreatedNews = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [myNews, setMyNews] = useState([]);
    const navigate = useNavigate();

    const getNews = () => {
        axios.get(`${BASE_URL}/news`)
        .then(response => {
            setMyNews(response.data.filter((item) => item.author === user.username));
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
        getNews();
        
    })
    return(
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={myNews}
                renderItem={(item) => (
                    <List.Item
                        key={item.url}
                        onClick={() => clickNews(item)}
                        actions={[]}
                        // extra={
                        //     <img
                        //         width={200}
                        //         alt="logo"
                        //         src={item.image}
                        //     />
                        // }
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

export default CreatedNews;