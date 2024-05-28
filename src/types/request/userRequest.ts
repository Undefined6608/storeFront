// 电话号码登录参数类型
export interface PhoneLoginType {
	phone: string;
	password: string;
	imgCode: string;
	remember: boolean;
}

// 邮箱登录参数类型
export interface EmailLoginType {
	email: string;
	password: string;
	imgCode: string;
	remember: boolean;
}

// 注册参数类型
export interface RegisterType {
	userName: string;
	phone: string;
	email: string;
	avatar: string;
	emailCode: string;
	imgCode: string;
	gender: number;
	limitType: number;
	password: string;
	verPassword: string;
}

// 修改用户信息参数类型
export interface ModifyUserInfoType {
	userName: string;
	phone: string;
	email: string;
	avatar: string;
	gender: number;
	imgCode: string;
	emailCode: string;
}

// 修改密码参数类型
export interface ModifyPasswordType {
	oldPassword: string;
	newPassword: string;
	verifiedPassword: string;
	imgCode: string;
}

// 删除用户信息参数类型
export interface DeleteUserType {
	userUid: string;
}
