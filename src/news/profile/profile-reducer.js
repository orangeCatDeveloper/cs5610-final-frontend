import { createSlice, configureStore } from "@reduxjs/toolkit";
import profile from "./profile.json";

const currentProfile = {
    firstName: 'Jose', lastName: 'Annunziato', handle: '@jannunzi',
    profilePicture: 'jose.png', 	bannerPicture: 'polyglot.png',
    bio: 'Faculty, Software Engineer, AI, Space, and renewable enthusiast.Retuits and likes are not endorsements.',
    website: 'youtube.com/webdevtv',
    location: 'Boston, MA',	dateOfBirth: '7/7/1968',	dateJoined: '4/2009',
    followingCount: 340,	followersCount: 223
  }

   

const profileSlice = createSlice({
 name: 'profile',
 initialState: profile,
 reducers: {
    setName: (state, action) => {
        state.firstName = action.payload;
      },
    editProfile(state, action) {
        state = action.payload;
      }
  }
 
});

export const { setName } = profileSlice.actions;

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
  },
});

export const {editProfile} = profileSlice.actions;
export default profileSlice.reducer;