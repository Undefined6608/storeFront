import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { MessageStatus } from "@/types/global"; // 导入用户信息的类型

export interface MessageStatusState {
	status: MessageStatus | null;
}

const initialState: MessageStatusState = {
	status: null,
};

const userBtnStatusSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setMessageStatus: (state: MessageStatusState, action: PayloadAction<MessageStatus>) => {
			state.status = action.payload;
		},
	},
});

export const getMessageStatus = (state: RootState) => state.root.messageStatus.status;

export const { setMessageStatus } = userBtnStatusSlice.actions;
export default userBtnStatusSlice.reducer;
