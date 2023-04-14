import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Divider, Button, Form, Input } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserDetail = (
) => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [profile, setProfile] = useState({ username: "N/A", password: "123", firstName: "N/A", lastName: "N/A", email: "N/A" });
    const [isFollowing, setIsFollowing] = useState(false);

    const getUserProfile = () => {
        if (user) {
            axios.get(`${BASE_URL}/users/${id}`)
                .then(response => {
                    setProfile(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const handleFollow = () => {

    }

    const getFollowing = () => {
        // if (user) {
        //     axios.get(`${BASE_URL}/user/${user._id}/bookmark/${id}`)
        //         .then(response => setBookmark(response.data))
        //         .catch(error => {
        //             console.error(error);
        //         });
        // }
    }
    const toggleFollowing = () => {
        // if (user) {
        //     axios.put(`${BASE_URL}/user/${user._id}/bookmark/${id}`)
        //         .then(response => setBookmark(status => !status))
        //         .catch(error => {
        //             console.error(error);
        //         });
        // }
    }

    useEffect(() => {
        getUserProfile();
    }, [updateTrigger]);

    const onFinish = (value) => {
        axios.put(`${BASE_URL}/users/${user._id}`, { ...value, token: user.token })
            .then(response => setUpdateTrigger(status => !status))
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h4>User Profile</h4>
            <Divider />
            <Card>
                <Avatar size={64} icon={<UserOutlined/>} />
                <Divider />
                <h3>${profile.username}</h3>
                <p>First Name: ${profile.firstName}</p>
                <p>Last Name: ${profile.lastName}</p>
                <Button type="primary" onClick={handleFollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            </Card>
        </div>);
}

export default UserDetail;