import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { Image, List, Input, Button, Divider, Avatar, Skeleton } from 'antd';
import { StarOutlined, StarFilled, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;
const NewsDetail = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState([]);
    const [bookmark, setBookmark] = useState(false);
    const [review, setReview] = useState("");
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [newsReviews, setNewsReviews] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const getNewsDetail = () => {
        axios.get(`${BASE_URL}/news/${id}`)
            .then(response => setNewsData(response.data))
            .catch(error => {
                console.error(error);
            });
    }
    const getReviews = () => {
        axios.get(`${BASE_URL}/news/${id}/review`)
            .then(response => setNewsReviews(response.data))
            .catch(error => {
                console.error(error);
            });
    }
    const getBookmark = () => {
        if (user) {
            axios.get(`${BASE_URL}/user/${user._id}/bookmark/${id}`)
                .then(response => setBookmark(response.data))
                .catch(error => {
                    console.error(error);
                });
        }
    }
    const toggleBookmark = () => {
        if (user) {
            axios.put(`${BASE_URL}/user/${user._id}/bookmark/${id}`)
                .then(response => setBookmark(status => !status))
                .catch(error => {
                    console.error(error);
                });
        }
    }
    const createReview = () => {
        if (user) {
            axios.post(`${BASE_URL}/user/${user._id}/review/${id}`, { content: review, token: user.token })
                .then(response => setUpdateTrigger(status => !status));
        } else {
            alert("Please login");
        }
    }
    const deleteReview = (nid) => {
        console.log("delete");
        // if (user) {
        //     axios.delete(`${BASE_URL}/user/${user._id}/review/${nid}`)
        //     .then(response => setDeleteUpdate(status => !status));
        // } else {
        //     alert("Please login");
        // }

    }

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        getNewsDetail();
        getBookmark();
        getReviews();
    }, [updateTrigger]);

    return (
        <div>
            <Button type="primary" size="small" style={{ marginBottom: "20px" }} onClick={handleBack}>Back</Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>{newsData.title}</h4>
                <div onClick={toggleBookmark}>
                    {bookmark ? <StarFilled style={{ fontSize: '24px' }} /> : <StarOutlined style={{ fontSize: '24px' }} />}
                </div>
            </div>
            <div>Author: {newsData.author}</div>
            <Divider />
            <Image
                width={700}
                src={newsData.image}
            />
            <Divider />
            <p>{newsData.description}</p>
            <p>{newsData.content}</p>
            <a href={newsData.url} target="_blank">Original post</a>
            <br />
            <br />
            <TextArea rows={4} placeholder="Write a review" onChange={e => setReview(e.target.value)} />
            <Button
                type="primary"
                style={{ marginBottom: "20px", marginTop: "10px" }}
                onClick={createReview}
                disabled={!user}>
                Post Review
            </Button>
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
                dataSource={newsReviews}

                renderItem={(item) => (
                    <List.Item
                        // onClick={() => navigate(`/user-detail/${item.postedBy._id}`)  }

                        key={item._id}
                        actions={[item.postedBy._id === user._id && <a key="delete post" onClick={
                            // deleteReview(item.newsID)
                            () =>
                                axios.delete(`${BASE_URL}/user/${user._id}/review/${item.newsID}`).then(response => setUpdateTrigger(status => !status))
                        }>delete</a>]}
                    >
                        <List.Item.Meta
                            avatar={
                            <Avatar size={26} icon={<UserOutlined />} />
                             }
                            title={<a onClick={() => item.postedBy._id === user._id ? navigate('/profile') : navigate(`/profile/${item.postedBy._id}`)  }>{item.postedBy.username}</a>}
                            description={item.content}
                        />

                    </List.Item>

                )}
            />
        </div>

    )
}

export default NewsDetail;