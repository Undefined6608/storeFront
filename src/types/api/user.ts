// 登录Api响应类型
export interface LoginResponseType {
	token: string
}

// 用户信息Api响应类型
export interface UserInfoType {
	userName: string;
	email: string;
	phone: string;
	gender: boolean;
	limitType: number;
	avatar: string;
	integral: number;
	balance: number;
	likeNum: number;
	dontLike: number;
	uid: string;
}
