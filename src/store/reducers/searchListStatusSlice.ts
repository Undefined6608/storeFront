import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { SearchListStatus } from "@/types/global"; // 导入用户信息的类型

export interface SearchListStatusState {
	status: SearchListStatus | null;
}

const initialState: SearchListStatusState = {
	status: null,
};

const searchListSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setSearchListStatus: (state: SearchListStatusState, action: PayloadAction<SearchListStatus>) => {
			state.status = action.payload;
		},
	},
});

export const getSearchListStatus = (state: RootState) => state.root.searchListStatus.status;

export const { setSearchListStatus } = searchListSlice.actions;
export default searchListSlice.reducer;
