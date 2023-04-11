import React, { useState } from 'react';
import { Input, List } from 'antd';
import axios from 'axios';
const { Search } = Input;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SearchCompoent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (value) => {
    axios.get(`${BASE_URL}/search?keyword=${value}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  console.log(searchResults);

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