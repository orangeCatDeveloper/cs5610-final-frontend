import React, { useEffect, useState } from 'react';
import { List, Divider, Avatar } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Review = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [myReview, setMyReview] = useState([]);
    const navigate = useNavigate();

    const getMyReview = () => {
        axios.get(`${BASE_URL}/user/${user._id}/review`)
        .then(response => {
            setMyReview(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getMyReview();
    })
    return(
        <div>
            <h4>Reviews</h4>
            <Divider />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={myReview}

                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[]}
                    >
                        <List.Item.Meta
                            title={"Review: " + item.content}
                            description={"Reviewed at: " + new Date(item.createdAt).toLocaleDateString()}
                        />
                        {"News reviewed: " + item.newsID.title}
                    </List.Item>
                )}
            />
        </div>
        
    )
}

export default Review;