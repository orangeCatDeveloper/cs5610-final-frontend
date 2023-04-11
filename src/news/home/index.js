import React, { useState } from 'react';
import { Input, List } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const NewsList = () => {
    
    const [allNews, setAllNews] = useState([]);
    const newsResponse = axios.get(`${BASE_URL}/news`)
    .then(response => {
        setAllNews(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    const navigate = useNavigate();

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

    return (
        <div>
            <h4>Home</h4>
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
                key={item.url}
                onClick={() => clickNews(item)}
                actions={[]}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src={item.image}
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