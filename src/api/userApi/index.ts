import {get, login, post} from "@/config/request";
import {BaseResponseType} from "@/types/api";
import {LoginResponseType, UserInfoType} from "@/types/api/user";
import {EmailLoginType, PhoneLoginType, RegisterType} from "@/types/request/userRequest";
import {EmailOccupy, PhoneOccupy, UserNameOccupy} from "@/types/request/occupy";

// 用户名查重接口
export const userNameOccupy = (body:UserNameOccupy) => post<BaseResponseType<string>>("/user/userNameOccupy",{...body}).then(r=>r.data);

// 电话号码查重接口
export const phoneOccupy = (body:PhoneOccupy) => post<BaseResponseType<string>>("/user/phoneOccupy",{...body}).then(r=>r.data);

// 邮箱查重接口
export const emailOccupy = (body:EmailOccupy) => post<BaseResponseType<string>>("/user/emailOccupy",{...body}).then(r=>r.data);

// 注册
export const register = (body:RegisterType) => post<BaseResponseType<string>>("/user/register",
    {...body}
).then(r=>r.data);

// 电话号码登录接口
export const phoneLogin = (body:PhoneLoginType) => login<BaseResponseType<LoginResponseType>>("/user/phoneLogin", {
    phone: body.phone,
    password: body.password,
    imgCode: body.imgCode
}).then(r=>r.data);

// 邮箱登录接口
export const emailLogin = (body:EmailLoginType) => login<BaseResponseType<LoginResponseType>>("/user/emailLogin", {
    email: body.email,
    password: body.password,
    imgCode: body.imgCode
}).then(r=>r.data);

// 用户信息获取接口
export const getUserInfo = () => get<BaseResponseType<UserInfoType>>("/user/userInfo").then(r=>r.data);

// 退出登录
export const logout = () => post<BaseResponseType<string>>("/user/logout").then(r=> r.data);
