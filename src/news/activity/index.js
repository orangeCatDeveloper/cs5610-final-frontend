import React from "react";
import { StarOutlined, CommentOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import getItem from "../../common/util";
import Bookmark from "./bookmark";
import Review from "./review";
import Following from "./following";
import Follower from "./follower";

const items = [
    getItem(<span><StarOutlined />Bookmark</span>, '/bookmark', null, <Bookmark />), 
    getItem(<span><CommentOutlined />Review</span>, '/review', null, <Review />),
    getItem(<span>Following</span>, '/following', null, <Following />), 
    getItem(<span>Follower</span>, '/follower', null, <Follower />)
]

const Activities = () => {
    return (
        <div>
            <Tabs
                defaultActiveKey="4"
                items={
                    items
                }
            />
        </div>

    )
}

export default Activities;

