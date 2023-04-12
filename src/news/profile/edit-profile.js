import React, { useState } from "react";
import { editProfile } from "./profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import ProfileState from "./ProfileState";

const EditProfile = (
) => {
    const user = useSelector((state) => state.currentUser.currentUser);
    const [profile, setProfile] = useState(ProfileState)
    const setFirstName = (e) => {
        const newFirstName = e.target.value;
        ProfileState.firstName = newFirstName;
        const newProfile = {
            ...profile,
            firstName: newFirstName
        };
        setProfile(newProfile)
    }
    const setLastName = (e) => {
        const newlastName = e.target.value;
        ProfileState.lastName = newlastName;
        const newProfile = {
            ...profile,
            lastName: newlastName
        };
        setProfile(newProfile)
    }
    const dispatch = useDispatch();
    const backToProfile = () => {
        window.history.back();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        window.history.back();
    }
    return(
    <div>
        <div className="row mb-2">
        <i className="col-2 bi bi-x-lg"
            onClick={backToProfile}></i>
        <h4 className="col-8">Edit Profile Page</h4>
        <button type="submit" className="btn btn-primary rounded-pill float-end col-2" onClick={handleSubmit}>Save</button>
        </div>
        
    <form onSubmit={handleSubmit}>
    <div className="position-relative mb-5">
        <img className="w-100" src={`/images/${profile.bannerPicture}`}/>
        {/* <img className="position-absolute wd-nudge-down rounded-circle" height={100} src={`/images/${profile.profilePicture}`}/> */}
    </div>
    
        <label for="firstName" className="form-label">firstName</label>
        <input
            className="form-control"
            type="text"
            id="firstName"
            value={user.firstName}
            onChange={setFirstName}
        />
        <label for="lastName" className="form-label">lastName</label>
        <input
            className="form-control"
            type="text"
            id="lastName"
            value={user.lastName}
            onChange={setLastName}
        />

        
    </form>
    </div>);
}

export default EditProfile;