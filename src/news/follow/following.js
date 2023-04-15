import React, { useEffect, useState } from 'react';
import { Input, List, Divider, Avatar } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StarOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Following = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [following, setFollowing] = useState([]);
    const navigate = useNavigate();

    const getFollowing = () => {
        axios.get(`${BASE_URL}/user/${user._id}/follow`)
        .then(response => {
            setFollowing(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getFollowing();
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
            dataSource={following}
            renderItem={(item) => (
                <List.Item
                    key={item.followee._id}
                    onClick={() => navigate(`/user-detail/${item.followee._id}`)}
                    actions={[]}

                >
                    <List.Item.Meta
                        avatar={
                        <Avatar size={26} icon={<UserOutlined />} />
                         }
                        title={item.followee.username}
                        description={item.followee.email}
                    />
                </List.Item>
            )}
        />
    </div>
    )
}

export default Following;