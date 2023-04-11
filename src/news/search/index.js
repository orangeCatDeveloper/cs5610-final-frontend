import React, { useState } from 'react';
import { Input, List } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
const BASE_URL = process.env.REACT_APP_BASE_URL;


const SearchCompoent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    axios.get(`${BASE_URL}/search?keyword=${value}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

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
      <h4>Search News</h4>
      <Search placeholder="Search for news" enterButton="Search" size="large" onSearch={handleSearch} />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={searchResults}
        renderItem={(item) => (
          <List.Item
            key={item.url}
            onClick={() => clickNews(item)}
            actions={[]}
            extra={
              <img
                width={272}
                alt="logo"
                src={item.urlToImage}
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
  );
};

export default SearchCompoent;