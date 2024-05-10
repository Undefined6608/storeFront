// 用户名查重接口
import { get } from "@/config/request";
import { BaseResponseType } from "@/types/api";
import { BannerResponse, ProductResponse, ProductTypeResponse } from "@/types/api/product";

export const getBannerListApi = () => get<BaseResponseType<BannerResponse>>("/product/getBannerList",).then(r => r.data);

export const getProductTypeApi = () => get<BaseResponseType<ProductTypeResponse>>("/product/getProductType",).then(r => r.data);

export const getProductListApi = (typeId: number) => get<BaseResponseType<ProductResponse>>("/product/getProductList?typeId=" + typeId).then(r => r.data);
