import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api/userApi";

// 用户信息获取
export const userInfoAsync = createAsyncThunk(
	"userInfo/fetchUserInfo",
	async () => {
		const response = await getUserInfo();
		return response.data;
	},
);
