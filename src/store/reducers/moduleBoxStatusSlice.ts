import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { UserModuleBoxStatus } from "@/types/global"; // 导入用户信息的类型

export interface UserModuleBoxStatusState {
	status: UserModuleBoxStatus;
}

const initialState: UserModuleBoxStatusState = {
	status: {
		addProduct: false,
		payProduct: false,
		addUserLoad: false,
	},
};

const userModuleBoxStatusSlice = createSlice({
	name: "userModuleBoxStatus",
	initialState,
	reducers: {
		setUserModuleBoxStatus: (state: UserModuleBoxStatusState, action: PayloadAction<Partial<UserModuleBoxStatus>>) => {
			state.status = {...state.status, ...action.payload};
		},
	},
});

export const getModuleBoxStatus = (state: RootState) => state.root.userModuleBoxStatus.status;

export const { setUserModuleBoxStatus } = userModuleBoxStatusSlice.actions;
export default userModuleBoxStatusSlice.reducer;
