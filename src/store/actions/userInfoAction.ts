import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api/userApi";

export const userInfoAsync = createAsyncThunk(
	"userInfo/fetchUserInfo",
	async () => {
		const response = await getUserInfo();
		return response.data;
	}
);
