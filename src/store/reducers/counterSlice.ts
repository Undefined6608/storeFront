import { userInfoType } from "@/types/api/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userInfoType = {
    userName: "",
    email: "",
    phone: "",
    gender: false,
    limitType: 3,
    avatar: "",
    integral: 0,
    balance: 0,
    likeNum: 0,
    dontLike: 0,
    uid: "",
};

const counterSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<userInfoType>) => {
            state = action.payload;
        },
    },
});

export const { setUserInfo } = counterSlice.actions;
export default counterSlice.reducer;
