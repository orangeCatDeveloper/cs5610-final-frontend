import React from "react";
import {Routes, Route} from "react-router";
import { configureStore }
  from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import NavigationSidebar from "./navigation-sidebar";
import HomeComponent from "./home";
import ProfileComponent from "./profile";
import ActivitiesComponent from "./activity";
import TopbarComponent from "./topbar";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import EditProfileComponent from "./profile/edit-profile";
import profileReducer from "./profile/profile-reducer";
import userReducer from "../redux/user-reducer";
const store = configureStore(
    {reducer: {profile: profileReducer, user: userReducer}});
  

function News() {
    return(
        <Provider store={store}>
            <div>
            <TopbarComponent/>
            <div style={{
                display: "flex", flexDirection: "row"
            }}>
            <NavigationSidebar/>
            
    
            <div className="" >
                <Routes>
                    <Route path="profile"    element={<ProfileComponent/>}/>
                    <Route path="edit-profile" element={<EditProfileComponent/>}/>
                    <Route path="home"    element={<HomeComponent/>}/>
                    <Route path="activities"    element={<ActivitiesComponent/>}/>
                    <Route path="login"    element={<LoginComponent/>}/>
                    <Route path="signup"    element={<RegisterComponent/>}/>
                </Routes>
            </div>
            </div>

            </div>
        </Provider>


        

    )

}

export default News;