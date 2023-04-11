import React from "react";
import { useSelector } from "react-redux";
import ProfileDetail from "./profile-detail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const  Profile = () => {
    const profile = useSelector((state) => state.profile);
    return(
        <div>
            {
        profile.map(p => <ProfileDetail key={p._id} profile={p}/>)
    }
        </div>
        
    )
}

export default Profile;