import React, { useEffect, useState } from 'react';
import { Input, List, Divider } from 'antd';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
const { Search } = Input;
const BASE_URL = process.env.REACT_APP_BASE_URL;


const SearchCompoent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
});
  const keyword = searchParams.get('keyword');
  const handleSearch = (value) => {
    navigate(`/search?keyword=${value}`);
  };

  const fetchNews = () => {
    axios.get(`${BASE_URL}/search?keyword=${keyword}`)
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
  const handleResize = () => {
    setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        
    });
}

  useEffect(() => {
    if (keyword !== null) {
      fetchNews();
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, [keyword]);

  return (
    <div>
      <h4>Search News</h4>
      <Divider />
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
              (windowSize.width > 786) && <img
                width={272}
                alt="logo"
                src={item.urlToImage ? item.urlToImage : '/images/banner.png'}
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