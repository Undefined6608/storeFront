// 导入用户信息的类型
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import {ShoppingCartStatus} from "@/types/global";
import Cache from "@/utils/cache";

// 弹窗信息接口
export interface ShoppingCartStatusState {
	status: ShoppingCartStatus[];
}

// 初始化本地缓存
const cache = new Cache<ShoppingCartStatus[]>();

// 初始化数据
const initialState: ShoppingCartStatusState = {
	status: cache.get("shoppingCart") || [],
};

const shoppingCartStatusSlice = createSlice({
	name: "shoppingCartStatus",
	initialState,
	reducers: {
		addShoppingCartStatus: (state: ShoppingCartStatusState, action: PayloadAction<ShoppingCartStatus>) => {
			state.status.push(action.payload);
			cache.set("shoppingCart", state.status);
		},
		deleteShoppingCartStatus: (state: ShoppingCartStatusState, action: PayloadAction<ShoppingCartStatus>) => {
			state.status.splice(state.status.indexOf(action.payload), 1);
			cache.set("shoppingCart", state.status);
		},
		clearShoppingCartStatus: (state: ShoppingCartStatusState, action: PayloadAction<{ clear: boolean }>) => {
			if (action.payload.clear) {
				state.status.splice(0, state.status.length);
				cache.clear();
			}
		},
	},
});

export const getShoppingCartStatus = (state: RootState) => state.root.shoppingCartStatus.status;

export const {
	addShoppingCartStatus,
	deleteShoppingCartStatus,
	clearShoppingCartStatus,
} = shoppingCartStatusSlice.actions;
export default shoppingCartStatusSlice.reducer;
