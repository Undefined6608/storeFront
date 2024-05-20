import { get } from "@/config/request";
import { BaseResponseType } from "@/types/api";
import { UserLoadType } from "@/types/api/orderForm";

// 获取订单地址列表
export const getUserLoadListApi = () => get<BaseResponseType<{ userAddress: UserLoadType[] }>>("/orderForm/getUserAddressList").then(r => r.data);