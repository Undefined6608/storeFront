import {get, post} from "@/config/request";
import {BaseResponseType} from "@/types/api";
import {ImgCodeType} from "@/types/api/verifyCode";

export const getImgVerifyCode = () => get<BaseResponseType<ImgCodeType>>("/verifyCode/imgCode").then(res=>res.data);
export const sendEmailCode = (email:string) => post<BaseResponseType<ImgCodeType>>("/verifyCode/emailCode",{"email":email}).then(res=>res.data);
