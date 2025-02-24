import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import eventReducer from "./slices/eventSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  event: eventReducer,
});

export default rootReducer;
