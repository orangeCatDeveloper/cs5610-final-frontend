import React from "react";
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = () => {
    return(
        <>
        <Search placeholder="Search for news" enterButton="Search" size="large" />
      </>
        
    )
}

export default SearchBar;