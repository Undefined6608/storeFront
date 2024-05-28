import { md5 } from "js-md5";
// 私钥
const privateKey = "392a2f71-4bd5-44fc-a6fa-b3448085a4c9";
/**
 * 密码加密
 * @param password 原始密码
 * @returns 加密后的密码
 */
export const passwordEncryption = (password: string): string => {
	return md5(password + privateKey);
};

/**
 * 基础的上传图片地址
 * @returns 地址
 */
export const baseUploadImgUrl = (): string => {
	return "/api/upload";
};
