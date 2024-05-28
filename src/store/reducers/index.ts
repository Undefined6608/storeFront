import { combineReducers } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import userBtnStatusReducer from "@/store/reducers/userBtnStatusSlice";
import messageReducer from "@/store/reducers/messageSlice";
import searchListStatusReducer from "./searchListStatusSlice";
import moduleBoxStatusReducer from "@/store/reducers/moduleBoxStatusSlice";
import shoppingCartStatusReducer from "@/store/reducers/shoppingCartSlice";

// rootReducer /** 主 Reducer
const rootReducer = combineReducers({
	userInfo: userInfoReducer,
	userBtnStatus: userBtnStatusReducer,
	messageStatus: messageReducer,
	searchListStatus: searchListStatusReducer,
	userModuleBoxStatus: moduleBoxStatusReducer,
	shoppingCartStatus: shoppingCartStatusReducer,
});

export default rootReducer;
