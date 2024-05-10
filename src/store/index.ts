import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/reducers";

const store = configureStore({
	reducer: {
		root: rootReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
