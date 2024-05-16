import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import userBtnStatusReducer from "@/store/reducers/userBtnStatusSlice";
import messageReducer from "@/store/reducers/messageSlice";
import searchListStatusReducer from "./searchListStatusSlice";

const rootReducer = combineReducers({
	userInfo: userInfoReducer,
	userBtnStatus: userBtnStatusReducer,
	messageStatus: messageReducer,
	searchListStatus: searchListStatusReducer,
});

export default rootReducer;
