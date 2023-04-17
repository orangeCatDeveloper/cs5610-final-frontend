import React, { useEffect, useState } from 'react';
import { Input, List, Divider, Avatar } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Follower = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [follower, setFollower] = useState([]);
    const navigate = useNavigate();

    const getFollower = () => {
        axios.get(`${BASE_URL}/user/follow/${user._id}`)
        .then(response => {
            setFollower(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getFollower();
    })
    return (
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
            dataSource={follower}
            renderItem={(item) => (
                <List.Item
                    key={item.follower._id}
                    onClick={() => navigate(`/profile/${item.follower._id}`)}
                    actions={[]}
                >
                    <List.Item.Meta
                        avatar={
                            <Avatar size={26} icon={<UserOutlined />} />
                                }
                        title={item.follower.username}
                        description={item.follower.email}
                    />
                </List.Item>
            )}
        />
    </div>
    )
}

export default Follower;