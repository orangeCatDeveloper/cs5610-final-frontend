import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ProfileState from "./ProfileState";

const ProfileDetail = (
) => {
    const user = useSelector((state) => state.currentUser.currentUser);
    const [profile, setProfile] = useState(ProfileState)
    return(
        <div>
            <Link to="/edit-profile" className="btn btn-primary rounded-pill float-end mt-1">
                    Edit Profile
            </Link>
            <h4>Username: {user.username}</h4>
            <h4>ID: {user._id}</h4>
            <div className="position-relative">
                <img className="w-100" src={`/images/${profile.bannerPicture}`}/>
                {/* <img className="position-absolute wd-nudge-down rounded-circle" height={100} src={`/images/${profile.profilePicture}`}/> */}

                {/* <a className="btn btn-primary rounded-pill float-end mt-1" href="">Edit Profile</a> */}
            </div>
            
            <p><b>First Name: {user.firstName}</b></p>
            <p><b>Last Name: {user.lastName}</b></p>
            <p><b>Email: {user.email}</b></p>
            {/* <div>
                <span className="wd-other-icon wd-handle2">
                    <i className="bi bi-geo-alt"></i> {profile.location}
                </span>
                <span className="wd-other-icon wd-handle2">
                    <i className="bi bi-balloon"></i> {profile.dateOfBirth}
                </span>
                <span className="wd-other-icon wd-handle2">
                    <i className="bi bi-calendar3"></i> {profile.dateJoined}
                </span>
            </div>
            <div>
                <span><b>{profile.followingCount}</b> following</span>
                <span className="ms-2"><b>{profile.followersCount}</b> followers</span>
            </div> */}
        </div>
    )
}

export default ProfileDetail;