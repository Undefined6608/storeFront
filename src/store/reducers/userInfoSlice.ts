import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoType } from "@/types/api/user";
import { userInfoAsync } from "@/store/actions/userInfoAction";
import { RootState } from "@/store";

export interface UserInfoState {
	userInfo: UserInfoType | null;
	status: "idle" | "loading" | "failed"
}

const initialState: UserInfoState = {
	userInfo: null,
	status: "idle",
};

const userInfoSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		removeUserInfo: (state: UserInfoState, action: PayloadAction<UserInfoType | null>) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(userInfoAsync.pending, state => {
				state.status = "loading";
			})
			.addCase(userInfoAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.userInfo = action.payload;
			})
			.addCase(userInfoAsync.rejected, state => {
				state.status = "failed";
			});
	},
});

export const fetchUserInfo = (state: RootState) => state.root.userInfo.userInfo;
export const { removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
