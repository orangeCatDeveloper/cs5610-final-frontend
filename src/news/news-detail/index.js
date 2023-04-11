import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import {Image, List, Input, Button} from 'antd';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;
const NewsDetail = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState([]);
    const [bookmark, setBookmark] = useState([]);
    const [review, setReview] = useState([]);
    const [newsReviews, setNewsReviews] = useState([]);

    const getNewsDetail = (id) => {
        axios.get(`${BASE_URL}/news/${id}`)
        .then(response => {
          setNewsData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    const getReviews = (id) => {
        axios.get(`${BASE_URL}/news/${id}/reviews`)
        .then(response => {
          setNewsReviews(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    const createReview = () => {
        //need user id
        // axios.post(`${BASE_URL}/user/`)
    }

    useEffect(() => {
        // fetch news data
        getNewsDetail(id);
        // fetch bookmark data
        // fetch review data
        getReviews(id);
    }, []);



    return (
        <div>
            <h4>{newsData.title}</h4>
            <Image
                width={"full"}
                src={newsData.image}
            />
            
            <p>Author: {newsData.author}</p>
            <p>{newsData.content}</p>
            <p>{newsData.description}</p>
            <p>{newsData.description}</p>
            <a href={newsData.url}>Original post</a>
            <br/>
            <br/>
            <TextArea rows={4} placeholder="Write a review" onChange={setReview}/>
            <Button type="primary" onClick={createReview}>Post Review</Button>
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