import {get, post} from "@/config/request";
import {BaseResponseType} from "@/types/api";
import {UserLoadType} from "@/types/api/orderForm";
import {UserLoadParam} from "@/types/request/orderFormRequest";

// 获取订单地址列表
export const getUserLoadListApi = () =>
	get<BaseResponseType<{ userAddress: UserLoadType[] }>>("/orderForm/getUserAddressList").then(r => r.data);

// 添加订单地址
export const addUserLoadApi = (param:UserLoadParam) =>
	post<BaseResponseType<string>>("orderForm/addUserAddress",{...param}).then(r => r.data);
