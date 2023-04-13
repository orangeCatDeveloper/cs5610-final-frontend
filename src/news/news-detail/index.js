import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Image, List, Input, Button, Divider } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;
const NewsDetail = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState([]);
    const [bookmark, setBookmark] = useState(false);
    const [review, setReview] = useState("");
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [newsReviews, setNewsReviews] = useState([]);
    const user = useSelector((state) => state.currentUser.currentUser);
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
            axios.post(`${BASE_URL}/user/${user._id}/review/${id}`, review)
                .then(response => setUpdateTrigger(status => !status));
        } else {
            alert("Please login");
        }
    }

    useEffect(() => {
        getNewsDetail();
        getBookmark();
        getReviews();
    }, [updateTrigger]);



    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>{newsData.title}</h5>
                <div onClick={toggleBookmark}>
                    {bookmark ? <StarFilled style={{ fontSize: '24px' }} /> : <StarOutlined style={{ fontSize: '24px' }} />}
                </div>
            </div>
            <div>Author: {newsData.author}</div>
            <Divider />
            <Image
                width={"full"}
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
                        key={item._id}
                        actions={[]}
                    // extra={
                    // <img
                    //     width={272}
                    //     alt="logo"
                    //     src={item.urlToImage}
                    // />
                    // }
                    >
                        <List.Item.Meta
                            title={item.postedBy}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>

    )
}

export default NewsDetail;