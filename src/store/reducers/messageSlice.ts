import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { MessageStatus } from "@/types/global"; // 导入用户信息的类型

// 弹窗信息接口
export interface MessageStatusState {
	status: MessageStatus | null;
}

// 初始化数据
const initialState: MessageStatusState = {
	status: null,
};

const messageStatusSlice = createSlice({
	name: "messageStatus",
	initialState,
	reducers: {
		setMessageStatus: (state: MessageStatusState, action: PayloadAction<MessageStatus>) => {
			state.status = action.payload;
		},
	},
});

export const getMessageStatus = (state: RootState) => state.root.messageStatus.status;

export const { setMessageStatus } = messageStatusSlice.actions;
export default messageStatusSlice.reducer;
