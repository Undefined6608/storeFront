export interface PhoneLoginType {
	phone: string;
	password: string;
	imgCode: string;
	remember: boolean;
}

export interface EmailLoginType {
	email: string;
	password: string;
	imgCode: string;
	remember: boolean;
}

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

export interface ModifyUserInfoType {
	userName: string;
	phone: string;
	email: string;
	avatar: string;
	gender: number;
	imgCode: string;
	emailCode: string;
}

export interface ModifyPasswordType {
	oldPassword: string;
	newPassword: string;
	verifiedPassword: string;
	imgCode: string;
}
