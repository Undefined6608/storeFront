import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { UserBtnStatus } from "@/types/global"; // 导入用户信息的类型

export interface UserBtnStatusState {
	status: UserBtnStatus | null;
}

const initialState: UserBtnStatusState = {
	status: null,
};

const userBtnStatusSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setUserBtnStatus: (state: UserBtnStatusState, action: PayloadAction<UserBtnStatus>) => {
			state.status = action.payload;
		},
	},
});

export const getUserBtnStatus = (state: RootState) => state.root.userBtnStatus.status;

export const { setUserBtnStatus } = userBtnStatusSlice.actions;
export default userBtnStatusSlice.reducer;
