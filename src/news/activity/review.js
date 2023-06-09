import React, { useEffect, useState } from 'react';
import { List, Divider, Avatar } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Review = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [myReview, setMyReview] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
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
    const clickNews = (news) => {
        navigate(`/news-detail/${news.newsID._id}`);
    };

    useEffect(() => {
        getMyReview();
    }, [updateTrigger])
    return(
        <div>
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
                        onClick={() => clickNews(item)}
                        actions={[<a key="delete post" onClick={
                                () => 
                                axios.delete(`${BASE_URL}/user/${user._id}/review/${item.newsID._id}`)
                                .then(response => setUpdateTrigger(status => !status))
                        }>delete</a>]}
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