import React from "react";
import { EyeOutlined, CommentOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import getItem from "../../common/util";
import Following from "./following";
import Follower from "./follower";

const items = [
    getItem(<span>Following</span>, '/bookmark', null, <Following />), getItem(<span>Follower</span>, '/review', null, <Follower />)
]

const Follow = () => {
    return (
        <div>
            <h4>Follow</h4>
            <Tabs
                defaultActiveKey="2"
                items={
                    items
                }
            />
        </div>

    )
}

export default Follow;

