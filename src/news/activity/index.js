import React from "react";
import { StarOutlined, CommentOutlined, HighlightOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import getItem from "../../common/util";
import Bookmark from "./bookmark";
import Review from "./review";
import Following from "./following";
import Follower from "./follower";
import CreatedNews from "./createdNews";

const items = [
    getItem(<span><StarOutlined />Bookmark</span>, '/bookmark', null, <Bookmark />), 
    getItem(<span><CommentOutlined />Review</span>, '/review', null, <Review />),
    getItem(<span><HighlightOutlined />Created</span>, '/createdNews', null, <CreatedNews />)
]

const Activities = () => {
    return (
        <div>
            <Tabs
                defaultActiveKey="5"
                items={
                    items
                }
            />
        </div>

    )
}

export default Activities;

