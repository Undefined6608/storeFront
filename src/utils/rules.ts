// 注册验证规则
import { RuleObject } from "rc-field-form/lib/interface";
import { emailOccupy, phoneOccupy, userNameOccupy } from "@/api/userApi";
import { BaseResponseType } from "@/types/api";

export const LoginRegExp = {
	illegal: /(.*=.*--.*)|(.*(\+|-).*)|(.*\w+(%|\$|#|&)\w+.*)|(.*\|\|.*)|(.*\s+(and|or)\s+.*)|(.*\b(select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|info|drop|execute)\b.*)/i,
	email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
	phone: /^1[3456789]\d{9}$/,
	username: /(^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+)|(^1[3456789]\d{9})$/
};

// 表单验证规则
export const formRule = {
	emailCode: [{ required: true, message: "邮箱验证码不能为空" }, { len: 6, message: "邮箱验证码长度错误" }],
	imgCode: [{ required: true, message: "图像验证码不能为空" }, { len: 6, message: "图像验证码长度错误" }],
};

export const validatorType = (func: Promise<BaseResponseType<string>>, _: RuleObject, value: string) => {
	if (value === null || value === "" || value === undefined) return;
	return new Promise<void>((resolve, reject) => {
		setTimeout(() => {
			func.then((r) => {
				// console.log(r);
				if (r.code === 400) return reject(new Error(r.msg));
				resolve();
			});
		}, 1000);
	});
};

/**
 * 验证用户名
 * @param _ 规则
 * @param value 用户名
 * @returns
 */
export const validatorUserName = (_: RuleObject, value: string) => {
	return validatorType(userNameOccupy({ userName: value }), _, value);
};

/**
 * 验证电话号码
 * @param _ 规则
 * @param value 电话号码
 * @returns
 */
export const validatorPhone = (_: RuleObject, value: string) => {
	return validatorType(phoneOccupy({ phone: value }), _, value);
};

/**
 * 验证邮箱
 * @param _ 规则
 * @param value 邮箱
 * @returns
 */
export const validatorEmail = (_: RuleObject, value: string) => {
	return validatorType(emailOccupy({ email: value }), _, value);
};
