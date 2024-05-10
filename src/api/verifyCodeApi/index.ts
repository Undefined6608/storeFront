import { get, post } from "@/config/request";
import { BaseResponseType } from "@/types/api";
import { ImgCodeType } from "@/types/api/verifyCode";

/**
 * 获取图像验证码
 * @returns 图像验证码数据
 */
export const getImgVerifyCode = () =>
	get<BaseResponseType<ImgCodeType>>("/verifyCode/imgCode").then(res => res.data);

/**
 * 发送邮箱验证码
 * @param email 邮箱
 * @returns 成功/失败通知
 */
export const sendEmailCode = (email: string) =>
	post<BaseResponseType<ImgCodeType>>(
		"/verifyCode/emailCode",
		{ "email": email },
	).then(res => res.data);
