import React from "react";
import { StarOutlined, CommentOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import getItem from "../../common/util";
import Bookmark from "./bookmark";
import Review from "./review";

const items = [
    getItem(<span><StarOutlined />Bookmark</span>, '/bookmark', null, <Bookmark/>), getItem(<span><CommentOutlined />Review</span>, '/review', null, <Review/> )
]

const Activities = () => {
    return(
        <div>
        <h4>Activities</h4>
        <Tabs
        defaultActiveKey="2"
        items={
        items
    }
      />
        </div>
        
    )
}

export default Activities;

