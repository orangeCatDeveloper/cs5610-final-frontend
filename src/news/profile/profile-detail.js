import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import ProfileState from "./ProfileState";

const ProfileDetail = (
) => {
    const [profile, setProfile] = useState(ProfileState)
    return(
        <div>
            <p>{profile.firstName} {profile.lastName}</p>
            <div className="position-relative">
                <img className="w-100" src={`/images/${profile.bannerPicture}`}/>
                {/* <img className="position-absolute wd-nudge-down rounded-circle" height={100} src={`/images/${profile.profilePicture}`}/> */}
                <Link to="/tuiter/edit-profile" className="btn btn-primary rounded-pill float-end mt-1">
                    Edit Profile
                </Link>
                {/* <a className="btn btn-primary rounded-pill float-end mt-1" href="">Edit Profile</a> */}
            </div>
            
            <h3 className="mt-5"><b>{profile.firstName} {profile.lastName}</b></h3>
            <p className="wd-handle2">{profile.handle}</p>
            <p>{profile.bio}</p>
            <div>
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
            </div>
        </div>
    )
}

export default ProfileDetail;