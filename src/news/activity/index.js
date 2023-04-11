import React from "react";
import { StarOutlined, CommentOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import getItem from "../../common/util";
import Bookmark from "./bookmark";
import Comments from "./comments";

const items = [
    getItem(<span><StarOutlined />Bookmark</span>, '/bookmark', null, <Bookmark/>), getItem(<span><CommentOutlined />Comments</span>, '/comments', null, <Comments/> )
]

const Activities = () => {
    return(
        <div>
        <h4>Activities</h4>
        <Tabs
        defaultActiveKey="2"
        items={
        //   [AppleOutlined, AndroidOutlined].map((Icon, i) => {
        //   const id = String(i + 1);
        //   return {
        //     label: (
        //       <span>
        //         <Icon />
        //         Tab {id}
        //       </span>
        //     ),
        //     key: id,
        //     children: `Tab ${id}`,
        //   };
        // })
        items
    }
      />
        </div>
        
    )
}

export default Activities;
