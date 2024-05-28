// 获取订单地址列表
import {get, post} from "@/config/request";
import {BaseResponseType} from "@/types/api";
import {FeedBackType} from "@/types/api/feedBack";
import {AddFeedBackType} from "@/types/request/feedBackRequest";

// 添加反馈信息
export const addFeedBackApi = (body: AddFeedBackType) => post<BaseResponseType<string>>("/feedBack/addFeedBack", {...body}).then(r => r.data);

// 获取反馈信息
export const getFeedBackApi = () => get<BaseResponseType<{ feedbackList: FeedBackType[] }>>("/feedBack/getFeedBack").then(r => r.data);
